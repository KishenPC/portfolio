import type { Graph } from "../core/graph";
import type { GraphState } from "../state/graph-store";
import type { AnyNode } from "../types/node.types";
import type { GraphEdge } from "../types/edge.types";

import { traverse } from "../algorithms/traversal";

export function getVisibleNodes(graph: Graph, state: GraphState): AnyNode[] {
  const visibleIds = new Set<string>();

  const root = graph.getNode(graph.rootNodeId);
  if (root) visibleIds.add(root.id);

  for (const id of state.expandedNodes) {
    visibleIds.add(id);
    const children = traverse(graph, id, "out", 1);
    for (const child of children) {
      visibleIds.add(child.id);
    }
  }

  return Array.from(visibleIds)
    .map((id) => graph.getNode(id))
    .filter((n): n is AnyNode => n !== undefined);
}

export function getVisibleEdges(graph: Graph, state: GraphState): GraphEdge[] {
  const visibleNodeIds = new Set(getVisibleNodes(graph, state).map((n) => n.id));
  return graph
    .getEdges()
    .filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
}

export function getFocusedRegion(
  graph: Graph,
  state: GraphState,
  radius: number = 1,
): { nodes: AnyNode[]; edges: GraphEdge[] } {
  const focusId = state.activeNode ?? graph.rootNodeId;
  const nodes = traverse(graph, focusId, "both", radius);
  const nodeIds = new Set(nodes.map((n) => n.id));

  const edges = graph.getEdges().filter((e) => nodeIds.has(e.source) || nodeIds.has(e.target));

  return { nodes, edges };
}

export function getCurrentPath(graph: Graph, state: GraphState): AnyNode[] {
  return state.breadcrumbs
    .map((id) => graph.getNode(id))
    .filter((n): n is AnyNode => n !== undefined);
}
