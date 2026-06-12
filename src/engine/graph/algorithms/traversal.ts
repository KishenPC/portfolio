import type { Graph } from "../core/graph";
import type { AnyNode } from "../types/node.types";

export function findNode(graph: Graph, id: string): AnyNode | undefined {
  return graph.getNode(id);
}

export function findChildren(graph: Graph, nodeId: string): AnyNode[] {
  const edges = graph.getOutgoingEdges(nodeId);
  return edges.map((e) => graph.getNode(e.target)).filter((n): n is AnyNode => n !== undefined);
}

export function findParents(graph: Graph, nodeId: string): AnyNode[] {
  const edges = graph.getIncomingEdges(nodeId);
  return edges.map((e) => graph.getNode(e.source)).filter((n): n is AnyNode => n !== undefined);
}

export function findRelated(graph: Graph, nodeId: string): AnyNode[] {
  const children = findChildren(graph, nodeId);
  const parents = findParents(graph, nodeId);
  const seen = new Set<string>([nodeId]);
  const result: AnyNode[] = [];

  for (const node of [...children, ...parents]) {
    if (!seen.has(node.id)) {
      seen.add(node.id);
      result.push(node);
    }
  }
  return result;
}

type TraversalDirection = "out" | "in" | "both";

export function traverse(
  graph: Graph,
  startId: string,
  direction: TraversalDirection,
  maxDepth?: number,
): AnyNode[] {
  const visited = new Set<string>();
  const result: AnyNode[] = [];
  const queue: { id: string; depth: number }[] = [{ id: startId, depth: 0 }];
  const startNode = graph.getNode(startId);
  if (!startNode) return result;

  visited.add(startId);
  result.push(startNode);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentDepth = current.depth;

    if (maxDepth !== undefined && currentDepth >= maxDepth) continue;

    let neighbors: string[] = [];

    if (direction === "out") {
      neighbors = graph.getOutgoingEdges(current.id).map((e) => e.target);
    } else if (direction === "in") {
      neighbors = graph.getIncomingEdges(current.id).map((e) => e.source);
    } else {
      const out = graph.getOutgoingEdges(current.id).map((e) => e.target);
      const incoming = graph.getIncomingEdges(current.id).map((e) => e.source);
      neighbors = [...out, ...incoming];
    }

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        const node = graph.getNode(neighborId);
        if (node) {
          result.push(node);
          queue.push({ id: neighborId, depth: currentDepth + 1 });
        }
      }
    }
  }

  return result;
}

export function shortestPath(graph: Graph, fromId: string, toId: string): string[] | null {
  if (fromId === toId) return [fromId];
  if (!graph.hasNode(fromId) || !graph.hasNode(toId)) return null;

  const visited = new Set<string>();
  const queue: string[][] = [[fromId]];
  visited.add(fromId);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    const neighbors = graph.getOutgoingEdges(current).map((e) => e.target);

    for (const neighbor of neighbors) {
      if (neighbor === toId) {
        return [...path, neighbor];
      }
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return null;
}
