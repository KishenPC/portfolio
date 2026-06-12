# Graph Engine

## Purpose

The Graph Engine transforms content relationships into an explorable graph model. It consumes the Phase 2 Content API, constructs a typed graph from domains, projects, skills, timeline events, and architecture diagrams, and provides traversal, expansion, state management, and selection algorithms that future rendering layers consume.

No rendering, animation, or visualization is implemented here. This is the pure logic layer.

## Architecture

```
Content API (Phase 2)
     ↓
buildKnowledgeGraph()
     ↓
Graph (nodes: Map, edges: array)
     ↓
┌────────────┬──────────────┬─────────────┐
│ Algorithms │ State        │ Selectors   │
│ - traverse │ - activeNode │ - visible   │
│ - expand   │ - expanded   │ - focused   │
│ - path     │ - history    │ - path      │
└────────────┴──────────────┴─────────────┘
                    ↓
            Future Renderers
         (Three.js, React, Canvas)
```

## Graph Model

### Node Types

| Type           | ID Format                             | Source                                         |
| -------------- | ------------------------------------- | ---------------------------------------------- |
| `root`         | `"root"`                              | Always created                                 |
| `domain`       | `"domain:{id}"`                       | Content `domains/*.json`                       |
| `project`      | `"project:{slug}"`                    | Content `projects/*/meta.json`                 |
| `architecture` | `"architecture:{ref}"`                | Content `architecture/*.json` (parent)         |
| `architecture` | `"arch-node:{id}"`                    | Architecture schema nodes (children)           |
| `timeline`     | `"timeline:{year}-{truncated-title}"` | Content `timeline/timeline.json`               |
| `skill`        | `"skill:{slugified-name}"`            | Deduplicated from domain skills + project tech |

### Edge Types

| Type         | Direction              | Meaning                                                                            |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------- |
| `contains`   | parent → child         | Root contains domains. Domain contains projects. Architecture contains arch-nodes. |
| `references` | source → target        | Domain references skills. Project references skills.                               |
| `belongs_to` | child → parent         | Project belongs to domain. Architecture belongs to domain.                         |
| `related_to` | bidirectional          | Project related to timeline. Arch-node related to arch-node.                       |
| `created_in` | timeline → project     | Timeline event marks creation of a project.                                        |
| `expands_to` | project → architecture | Project detail expands into architecture diagram.                                  |

## Construction Flow

1. **`buildKnowledgeGraph()`** calls the Content API to load all data.
2. Creates a **Root node** (`id: "root"`, label: "Portfolio").
3. For each **Domain**: creates a DomainNode with `contains` edge from root, then `references` edges to skill nodes (created on-demand with deduplication).
4. For each **Project**: creates a ProjectNode with `belongs_to` edge to its domain, `references` edges to tech skills, and `expands_to` to an architecture diagram if `architectureRef` is set.
5. For each **Architecture** (when referenced by a project): creates parent ArchitectureNode with `belongs_to` to domain, `contains` edges to child arch-nodes (one per node in the JSON), and `related_to` edges between arch-nodes matching the JSON edges.
6. For each **TimelineEvent**: creates a TimelineNode with `contains` from root and `created_in` edges to referenced projects (with reciprocal `related_to` edges back).

**Edge graph format:** `{source}--{type}-->{target}` ensures unique edge IDs.

**Skill deduplication:** Skills are keyed by slugified name in a Map. A skill referenced by multiple domains or projects is only created once.

## Node Lifecycle

1. **Created** — via `buildKnowledgeGraph()`, one-time construction.
2. **Expanded** — added to `expandedNodes` in GraphStore. Future rendering layers show children of expanded nodes.
3. **Collapsed** — removed from `expandedNodes`, along with all descendants. Children are hidden.
4. **Active** — set via `setActiveNode()`. Represents the user's current focus. Pushes to breadcrumbs and history.
5. **Hovered** — transient pointer state tracked by `hoverNode`.
6. **Resolved** — all nodes are always in the graph. Visibility is determined by expansion state, not removal.

## Traversal Algorithms

| Function       | Input                                | Output                                        | Complexity |
| -------------- | ------------------------------------ | --------------------------------------------- | ---------- |
| `findNode`     | graph, id                            | T \| undefined                                | O(1)       |
| `findChildren` | graph, id                            | T[]                                           | O(e)       |
| `findParents`  | graph, id                            | T[]                                           | O(e)       |
| `findRelated`  | graph, id                            | T[] (union of children+parents, deduplicated) | O(e)       |
| `traverse`     | graph, startId, direction, maxDepth? | T[] (BFS, bounded by depth)                   | O(n + e)   |
| `shortestPath` | graph, fromId, toId                  | string[] \| null (BFS, terminates on target)  | O(n + e)   |

- `traverse` direction: `"out"` (follows outgoing edges), `"in"` (incoming), `"both"` (undirected).
- `shortestPath` uses BFS with path reconstruction. Returns `null` if no path exists. Returns `[id]` when from === to.

## Expansion Algorithm

- **`expandNode(graph, state, id)`** — adds `id` to `expandedNodes`. Returns new state (immutable).
- **`collapseNode(graph, state, id)`** — removes `id` and all descendants (via BFS "out" traversal) from `expandedNodes`, then re-adds `id`. This ensures a collapsed node is still "visible" as a single node but its children are hidden.
- **`getSubgraph(graph, rootId, depth)`** — returns bounded subgraph of nodes and edges reachable within `depth` hops from rootId. Used for focused exploration views.

## State Management

### GraphStore

The GraphStore is a standalone state machine with no React dependency. It tracks:

```typescript
type GraphState = {
  activeNode: string | null; // Currently focused node
  hoverNode: string | null; // Pointer-hovered node
  expandedNodes: Set<string>; // Set of expanded node IDs
  breadcrumbs: string[]; // Path of active nodes (cumulative)
  history: string[]; // Navigation history (for back)
};
```

**State transitions:**

- `setActiveNode(id)` — sets active, pushes to history (no duplicates) and breadcrumbs
- `setHoverNode(id)` / `clearHover()` — transient hover tracking
- `expand(id)` / `collapse(id)` — modify expandedNodes set
- `navigateBack()` — pops history, restores previous active
- `reset()` — clears all state

All state mutations return new state objects (immutable pattern). The store is synchronous and deterministic — no side effects.

## Selectors

Selectors compute derived views from graph + state. They are pure functions.

| Selector                                  | Returns                                               | Use Case                 |
| ----------------------------------------- | ----------------------------------------------------- | ------------------------ |
| `getVisibleNodes(graph, state)`           | Nodes reachable from root through expanded nodes only | What to render           |
| `getVisibleEdges(graph, state)`           | Edges where both endpoints are visible                | What edges to draw       |
| `getFocusedRegion(graph, state, radius?)` | Nodes + edges within radius of active node            | Contextual detail view   |
| `getCurrentPath(graph, state)`            | Breadcrumbs mapped to node objects                    | Navigation breadcrumb UI |

**Visibility model:** Root is always visible. Expanding a node reveals its immediate children (depth 1). Each child must be explicitly expanded to reveal its children. This prevents overwhelming the graph view and gives the user control over exploration depth.

## Mock Data Flow

With current placeholder content:

```
Root
 ├── domain:systems             → skill:distributed-systems, skill:go, ...
 │   ├── project:scheduling-platform   → architecture:scheduling-platform
 │   │   ├── arch-node:api, arch-node:scheduler, ...
 │   │   └── arch-edge: api→scheduler, scheduler→db, ...
 │   └── project:system-design
 ├── domain:developer-tools     → skill:typescript, skill:node.js, ...
 │   └── project:dev-tools
 ├── domain:ai-infrastructure
 │   └── project:ai-evaluator
 ├── domain:full-stack
 └── timeline:2020-started-...
     ├── timeline:2023-built-...      → created_in → project:dev-tools
     ├── timeline:2024-designed-...   → created_in → project:scheduling-platform
     └── timeline:2025-ai-...         → created_in → project:ai-evaluator, project:system-design
```

## Future Rendering Integration

### Three.js (Phase 4+)

- `getVisibleNodes()` → 3D node positions + materials based on `node.type`
- `getVisibleEdges()` → 3D lines between nodes
- `getFocusedRegion()` → camera target + highlight radius
- `GraphStore.setActiveNode()` → camera animation trigger
- `GraphStore.expand()` → node reveal animation

### React (accessibility fallback)

- `getCurrentPath()` → accessible breadcrumb trail
- `getVisibleNodes()` → structured list view
- `traverse()` → sequential exploration mode

### GSAP (Phase 4+)

- State transitions (`expand`, `collapse`, `setActive`) → animation triggers
- `getFocusedRegion` boundary → scroll-linked context reveal

## Testing

36 tests across 7 categories:

- **Construction integrity** (6 tests) — verifies correct node/edge counts, all node types present
- **No orphan nodes** (1 test) — every node reachable from root via BFS
- **No invalid references** (2 tests) — all edge sources/targets reference existing nodes
- **Traversal correctness** (7 tests) — children/parents/related, depth limits, shortest path
- **No circular expansion** (3 tests) — expand idempotent, collapse removes descendants
- **GraphStore transitions** (7 tests) — init, setActive, dedup, hover, expand/collapse, navigateBack, reset
- **Selectors** (5 tests) — visible nodes/edges, focused region, current path

All tests pass.

## Dependencies

- `vitest` — test runner (dev dependency)
- Phase 2 Content API — `getProjects`, `getDomains`, `getTimeline`, `getArchitecture`
