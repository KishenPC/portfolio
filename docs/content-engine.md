# Content Engine

## Purpose

The Content Engine transforms the portfolio from static placeholder pages into a content-driven system. It establishes the data layer that all future phases consume — graph engine, Three.js scenes, GSAP orchestrations, and project simulations all read from this system.

## Architecture

```
content/                  → Authored content (JSON + MDX)
       ↓
src/content/schemas/      → Zod validation schemas + TypeScript types
       ↓
src/content/loaders/      → Read raw files, validate with schemas, throw on failure
       ↓
src/content/registry/     → Build-time registry: loads all content, indexes by slug/id
       ↓
src/content/transformers/ → Add computed properties (URLs, derived fields)
       ↓
src/content/api.ts        → Typed access functions consumed by routes
       ↓
src/app/(site)/           → Route components (server components, no client logic)
```

## Content Flow

### 1. Authoring

Content is authored in the root `content/` directory:

```
content/
├── projects/
│   ├── project-slug/
│   │   ├── meta.json      — Structured metadata (validated by ProjectSchema)
│   │   └── index.mdx       — Narrative content with YAML frontmatter
├── domains/
│   ├── domain-id.json      — Domain definitions (validated by DomainSchema)
├── timeline/
│   └── timeline.json       — Array of timeline events (validated by TimelineEventSchema)
└── architecture/
    ├── diagram-id.json      — Architecture diagrams (validated by ArchitectureSchema)
```

- **JSON files** contain structured data with strict contracts via Zod schemas.
- **MDX files** contain narrative prose with optional YAML frontmatter. The frontmatter is parsed by `gray-matter` and the body is rendered via `next-mdx-remote`.

### 2. Validation

Every piece of content is validated at build time. Loaders call `schema.parse()` from Zod on each content file. Invalid content (wrong types, missing required fields, unexpected values) causes `next build` to fail with a descriptive error message.

Schemas are defined in `src/content/schemas/`:

- `project.schema.ts` — Project: slug, title, summary, description, tech[], year, status, featured, domain, links, architectureRef
- `domain.schema.ts` — Domain: id, title, description, skills[] (optional)
- `timeline.schema.ts` — TimelineEvent: year, title, description, relatedProjects[]
- `architecture.schema.ts` — Architecture: nodes[], edges[], metadata{title, description, domain}

Each schema exports both a Zod schema and its inferred TypeScript type (`z.infer`). There is no `any` anywhere in the content pipeline.

### 3. Registry

The `ContentRegistry` class (`src/content/registry/registry.ts`) loads all content once at module initialization and indexes it in Maps for O(1) lookup by slug or ID.

- `getProjects()` — all projects
- `getProject(slug)` — single project by slug, or undefined
- `getProjectMdx(slug)` — raw MDX body string for rendering
- `getDomains()` — all domains
- `getDomain(id)` — single domain by ID, or undefined
- `getTimeline()` — all timeline events
- `getAllArchitectures()` — all architecture diagrams
- `getArchitecture(id)` — single architecture diagram by ID, or undefined

The registry is initialized once and cached for the lifetime of the build. Content is never loaded more than once.

### 4. Transformers

Transformers (`src/content/transformers/index.ts`) add computed properties to raw content types, keeping concern separation clean:

- `ProjectWithUrl` — adds `/projects/[slug]` URL
- `DomainWithUrl` — adds `/explore/[id]` URL

### 5. Content API

The public API (`src/content/api.ts`) provides typed access functions consumed by route components:

```
getProjects()      → ProjectWithUrl[]
getProject(slug)    → ProjectWithUrl | undefined
getProjectMdx(slug) → string | undefined
getDomains()        → DomainWithUrl[]
getDomain(id)       → DomainWithUrl | undefined
getTimeline()       → TimelineEvent[]
getAllArchitectures() → Architecture[]
getArchitecture(id)  → Architecture | undefined
```

All return types are statically typed. No runtime type assertions in route components.

### 6. Route Generation

Four content-driven routes are generated from the content system:

| Route               | Source                                        | Method                                         |
| ------------------- | --------------------------------------------- | ---------------------------------------------- |
| `/projects`         | `getProjects()`                               | Lists all projects (featured first, then rest) |
| `/projects/[slug]`  | `getProject(slug)` + `generateStaticParams()` | Individual project detail with MDX body        |
| `/explore`          | `getDomains()` + `getProjects()`              | Lists all domains with related project counts  |
| `/explore/[domain]` | `getDomain(id)` + `generateStaticParams()`    | Individual domain with filtered project list   |

Dynamic routes use `generateStaticParams()` to produce all pages at build time. No runtime rendering needed — all pages are static HTML.

## Validation Pipeline

```
content file
    ↓
fs.readFileSync()           — Node.js
    ↓
JSON.parse()                — Runtime parse
    ↓
schema.parse(data)          — Zod validation + type inference
    ↓  (throws on failure)
validated typed data
    ↓
cached in ContentRegistry
    ↓
returned via Content API
```

Build-time validation catches:

- Missing required fields
- Wrong types (string where number expected)
- Invalid enum values (`status` must be "active" | "complete" | "planned")
- Missing content files (loaders throw descriptive errors)
- Malformed JSON

## Future Extension Points

### Phase 3: Knowledge Graph

The graph engine reads from `contentRegistry.getProjects()`, `contentRegistry.getDomains()`, and `contentRegistry.getTimeline()` to construct nodes and edges. No content changes needed — the graph is derived from existing data plus the content model's relationship fields (`domain`, `relatedProjects`).

### Phase 4: Project Simulation

Project simulation consumes `contentRegistry.getProject(slug)` for system metadata and `contentRegistry.getArchitecture(ref)` for node/edge data. The simulation engine maps `SystemNode` types to Three.js scene objects, but the content layer remains unchanged.

### Phase 5: GitHub API

The GitHub service layer enriches `meta.json` data with repository metadata (stars, recent commits, languages). The enrichment is optional — if the API is unavailable, the fallback is the curated static content already in place.

### Adding New Content Types

To add a new content type:

1. Define its Zod schema in `src/content/schemas/`
2. Create a loader in `src/content/loaders/`
3. Add the type to `ContentRegistry` constructor
4. Expose access functions in `src/content/api.ts`
5. Create route components that consume the new API functions

## Dependencies

| Package           | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `gray-matter`     | Parse YAML frontmatter from MDX files               |
| `next-mdx-remote` | Compile and render MDX content in server components |
| `zod`             | Schema validation with TypeScript type inference    |
| `@next/mdx`       | Next.js MDX integration (Rust compiler)             |
