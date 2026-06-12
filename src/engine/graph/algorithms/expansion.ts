import type { Graph } from "../core/graph";
import type { GraphState } from "../state/graph-store";
import type { AnyNode } from "../types/node.types";
import type { GraphEdge } from "../types/edge.types";

import { traverse } from "./traversal";

export function expandNode(graph: Graph, state: GraphState, nodeId: string): GraphState {
  const nextExpanded = new Set(state.expandedNodes);
  nextExpanded.add(nodeId);
  return { ...state, expandedNodes: nextExpanded };
}

export function collapseNode(graph: Graph, state: GraphState, nodeId: string): GraphState {
  if (!state.expandedNodes.has(nodeId)) return state;

  const nextExpanded = new Set(state.expandedNodes);

  const descendants = traverse(graph, nodeId, "out");
  for (const desc of descendants) {
    nextExpanded.delete(desc.id);
  }

  nextExpanded.add(nodeId);
  return { ...state, expandedNodes: nextExpanded };
}

export function getSubgraph(
  graph: Graph,
  rootId: string,
  depth: number,
): { nodes: AnyNode[]; edges: GraphEdge[] } {
  const nodes = traverse(graph, rootId, "out", depth);
  const nodeIds = new Set(nodes.map((n) => n.id));

  const edges = graph.getEdges().filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  return { nodes, edges };
}
