import { describe, it, expect, beforeAll } from "vitest";

import { buildKnowledgeGraph, type Graph } from "../index";
import {
  findNode,
  findChildren,
  findParents,
  findRelated,
  traverse,
  shortestPath,
} from "../algorithms/traversal";
import { expandNode, collapseNode, getSubgraph } from "../algorithms/expansion";
import { GraphStore } from "../state/graph-store";
import {
  getVisibleNodes,
  getVisibleEdges,
  getFocusedRegion,
  getCurrentPath,
} from "../selectors/graph-selectors";

let graph: Graph;

beforeAll(() => {
  graph = buildKnowledgeGraph();
});

describe("Graph construction integrity", () => {
  it("builds a non-empty graph", () => {
    expect(graph.getNodeCount()).toBeGreaterThan(0);
    expect(graph.getEdgeCount()).toBeGreaterThan(0);
  });

  it("contains a root node", () => {
    const root = findNode(graph, "root");
    expect(root).toBeDefined();
    expect(root?.type).toBe("root");
  });

  it("all domain nodes exist", () => {
    const domainNode = findNode(graph, "domain:systems");
    expect(domainNode).toBeDefined();
    expect(domainNode?.type).toBe("domain");
  });

  it("all project nodes exist", () => {
    const projectNode = findNode(graph, "project:scheduling-platform");
    expect(projectNode).toBeDefined();
    expect(projectNode?.type).toBe("project");
  });

  it("timeline nodes exist with created_in edges to projects", () => {
    const timelineNodes = graph.getAllNodes().filter((n) => n.type === "timeline");
    expect(timelineNodes.length).toBeGreaterThan(0);

    for (const tn of timelineNodes) {
      const outgoing = graph.getOutgoingEdges(tn.id);
      const createdInEdges = outgoing.filter((e) => e.type === "created_in");
      for (const edge of createdInEdges) {
        expect(graph.hasNode(edge.target)).toBe(true);
      }
    }
  });

  it("architecture nodes exist when project has architectureRef", () => {
    const archNode = findNode(graph, "architecture:scheduling-platform");
    expect(archNode).toBeDefined();
    expect(archNode?.type).toBe("architecture");
  });

  it("arch-node children are created for architecture node components", () => {
    const apiNode = findNode(graph, "arch-node:api");
    expect(apiNode).toBeDefined();
    expect(apiNode?.type).toBe("architecture");
  });

  it("skill nodes are deduplicated", () => {
    const skillNodes = graph.getAllNodes().filter((n) => n.type === "skill");
    const names = skillNodes.map((n) => n.label);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });
});

describe("No orphan nodes", () => {
  it("every node is reachable from root (all nodes in BFS)", () => {
    const reachable = traverse(graph, "root", "out");
    const allNodes = graph.getAllNodes();
    const reachableIds = new Set(reachable.map((n) => n.id));

    for (const node of allNodes) {
      expect(reachableIds.has(node.id)).toBe(true);
    }
  });
});

describe("No invalid references", () => {
  it("all edge sources reference existing nodes", () => {
    for (const edge of graph.getEdges()) {
      expect(graph.hasNode(edge.source)).toBe(true);
    }
  });

  it("all edge targets reference existing nodes", () => {
    for (const edge of graph.getEdges()) {
      expect(graph.hasNode(edge.target)).toBe(true);
    }
  });
});

describe("Traversal correctness", () => {
  it("findChildren returns direct children of a node", () => {
    const rootChildren = findChildren(graph, "root");
    expect(rootChildren.length).toBeGreaterThan(0);
    for (const child of rootChildren) {
      const parentEdge = graph.getEdges().find((e) => e.source === "root" && e.target === child.id);
      expect(parentEdge).toBeDefined();
    }
  });

  it("findParents returns nodes that have edges to this node", () => {
    const projectParents = findParents(graph, "project:scheduling-platform");
    expect(projectParents.length).toBeGreaterThan(0);

    const domainParent = projectParents.find((p) => p.type === "domain");
    expect(domainParent).toBeDefined();
  });

  it("findRelated returns union of children and parents", () => {
    const related = findRelated(graph, "project:scheduling-platform");
    const children = findChildren(graph, "project:scheduling-platform");
    const parents = findParents(graph, "project:scheduling-platform");
    const relatedIds = new Set(related.map((n) => n.id));
    for (const c of children) expect(relatedIds.has(c.id)).toBe(true);
    for (const p of parents) expect(relatedIds.has(p.id)).toBe(true);
  });

  it("traverse with maxDepth limits results", () => {
    const depth1 = traverse(graph, "root", "out", 1);
    const depth2 = traverse(graph, "root", "out", 2);
    expect(depth2.length).toBeGreaterThan(depth1.length);
  });

  it("shortestPath finds path between connected nodes", () => {
    const path = shortestPath(graph, "root", "project:scheduling-platform");
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThanOrEqual(2);
    expect(path![0]).toBe("root");
    expect(path![path!.length - 1]).toBe("project:scheduling-platform");
  });

  it("shortestPath returns null for disconnected nodes (no path)", () => {
    const path = shortestPath(graph, "project:ai-evaluator", "timeline:does-not-exist");
    expect(path).toBeNull();
  });

  it("shortestPath returns single element when from and to are same", () => {
    const path = shortestPath(graph, "root", "root");
    expect(path).toEqual(["root"]);
  });
});

describe("No circular expansion", () => {
  it("expandNode adds node to expanded set", () => {
    const store = new GraphStore();
    const state = expandNode(graph, store.getState(), "domain:systems");
    expect(state.expandedNodes.has("domain:systems")).toBe(true);
  });

  it("expandNode is idempotent", () => {
    const store = new GraphStore();
    const state1 = expandNode(graph, store.getState(), "domain:systems");
    const state2 = expandNode(graph, state1, "domain:systems");
    expect(state2.expandedNodes.size).toBe(state1.expandedNodes.size);
  });

  it("collapseNode removes node and descendants from expanded", () => {
    const store = new GraphStore();
    let state = store.getState();
    state = expandNode(graph, state, "root");
    state = expandNode(graph, state, "domain:systems");
    state = expandNode(graph, state, "project:scheduling-platform");

    expect(state.expandedNodes.has("project:scheduling-platform")).toBe(true);

    state = collapseNode(graph, state, "domain:systems");
    expect(state.expandedNodes.has("domain:systems")).toBe(true);
    expect(state.expandedNodes.has("project:scheduling-platform")).toBe(false);
  });
});

describe("Stable traversal", () => {
  it("getSubgraph returns bounded node set", () => {
    const subgraph = getSubgraph(graph, "root", 2);
    expect(subgraph.nodes.length).toBeGreaterThan(0);
    expect(subgraph.nodes.length).toBeLessThan(graph.getNodeCount());
    for (const edge of subgraph.edges) {
      const sourceIn = subgraph.nodes.some((n) => n.id === edge.source);
      const targetIn = subgraph.nodes.some((n) => n.id === edge.target);
      expect(sourceIn).toBe(true);
      expect(targetIn).toBe(true);
    }
  });

  it("traverse results are stable across calls", () => {
    const result1 = traverse(graph, "root", "out", 2);
    const result2 = traverse(graph, "root", "out", 2);
    expect(result1.map((n) => n.id)).toEqual(result2.map((n) => n.id));
  });
});

describe("GraphStore state transitions", () => {
  it("initializes with empty state", () => {
    const store = new GraphStore();
    const state = store.getState();
    expect(state.activeNode).toBeNull();
    expect(state.hoverNode).toBeNull();
    expect(state.expandedNodes.size).toBe(0);
    expect(state.breadcrumbs).toEqual([]);
    expect(state.history).toEqual([]);
  });

  it("setActiveNode updates activeNode and adds to history", () => {
    const store = new GraphStore();
    store.setActiveNode("domain:systems");
    expect(store.getState().activeNode).toBe("domain:systems");
    expect(store.getState().history).toEqual(["domain:systems"]);
  });

  it("setActiveNode with same id does not duplicate in history", () => {
    const store = new GraphStore();
    store.setActiveNode("domain:systems");
    store.setActiveNode("domain:systems");
    expect(store.getState().history.length).toBe(1);
  });

  it("setHoverNode and clearHover work correctly", () => {
    const store = new GraphStore();
    store.setHoverNode("project:ai-evaluator");
    expect(store.getState().hoverNode).toBe("project:ai-evaluator");
    store.clearHover();
    expect(store.getState().hoverNode).toBeNull();
  });

  it("expand and collapse work", () => {
    const store = new GraphStore();
    store.expand("domain:systems");
    expect(store.getState().expandedNodes.has("domain:systems")).toBe(true);
    store.collapse("domain:systems");
    expect(store.getState().expandedNodes.has("domain:systems")).toBe(false);
  });

  it("navigateBack returns to previous node", () => {
    const store = new GraphStore();
    store.setActiveNode("domain:systems");
    store.setActiveNode("project:scheduling-platform");
    expect(store.getState().activeNode).toBe("project:scheduling-platform");

    store.navigateBack();
    expect(store.getState().activeNode).toBe("domain:systems");
  });

  it("reset clears all state", () => {
    const store = new GraphStore();
    store.setActiveNode("domain:systems");
    store.expand("domain:systems");
    store.reset();

    const state = store.getState();
    expect(state.activeNode).toBeNull();
    expect(state.expandedNodes.size).toBe(0);
    expect(state.history).toEqual([]);
  });
});

describe("Selectors", () => {
  it("getVisibleNodes returns root when nothing expanded", () => {
    const store = new GraphStore();
    const visible = getVisibleNodes(graph, store.getState());
    expect(visible.length).toBe(1);
    expect(visible[0].id).toBe("root");
  });

  it("getVisibleNodes includes expanded node and its children", () => {
    const store = new GraphStore();
    store.expand("root");
    const visible = getVisibleNodes(graph, store.getState());
    expect(visible.length).toBeGreaterThan(1);
  });

  it("getVisibleEdges returns edges between visible nodes only", () => {
    const store = new GraphStore();
    store.expand("root");
    const edges = getVisibleEdges(graph, store.getState());
    const visibleNodes = getVisibleNodes(graph, store.getState());
    const visibleIds = new Set(visibleNodes.map((n) => n.id));
    for (const edge of edges) {
      expect(visibleIds.has(edge.source)).toBe(true);
      expect(visibleIds.has(edge.target)).toBe(true);
    }
  });

  it("getFocusedRegion returns neighborhood around active node", () => {
    const store = new GraphStore();
    store.setActiveNode("project:scheduling-platform");
    const region = getFocusedRegion(graph, store.getState(), 1);
    expect(region.nodes.length).toBeGreaterThan(0);
    const regionIds = region.nodes.map((n) => n.id);
    expect(regionIds).toContain("project:scheduling-platform");
  });

  it("getFocusedRegion defaults to root when no active node", () => {
    const store = new GraphStore();
    const region = getFocusedRegion(graph, store.getState(), 1);
    expect(region.nodes.length).toBeGreaterThan(0);
    const regionIds = region.nodes.map((n) => n.id);
    expect(regionIds).toContain("root");
  });

  it("getCurrentPath maps breadcrumbs to nodes", () => {
    const store = new GraphStore();
    store.setActiveNode("domain:systems");
    store.setActiveNode("project:scheduling-platform");

    const path = getCurrentPath(graph, store.getState());
    expect(path.length).toBe(2);
    expect(path[0].id).toBe("domain:systems");
    expect(path[1].id).toBe("project:scheduling-platform");
  });
});
