import type { AnyNode } from "../types/node.types";
import type { GraphEdge } from "../types/edge.types";

export type GraphSnapshot = {
  nodes: AnyNode[];
  edges: GraphEdge[];
  rootNodeId: string;
};

export class Graph {
  private nodes: Map<string, AnyNode> = new Map();
  private edges: GraphEdge[] = [];
  private rootId: string;

  constructor(rootId: string = "root") {
    this.rootId = rootId;
  }

  get rootNodeId(): string {
    return this.rootId;
  }

  addNode(node: AnyNode): void {
    this.nodes.set(node.id, node);
  }

  addEdge(edge: GraphEdge): void {
    this.edges.push(edge);
  }

  getNode(id: string): AnyNode | undefined {
    return this.nodes.get(id);
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  getEdges(): GraphEdge[] {
    return [...this.edges];
  }

  getEdgesForNode(id: string): GraphEdge[] {
    return this.edges.filter((e) => e.source === id || e.target === id);
  }

  getOutgoingEdges(id: string): GraphEdge[] {
    return this.edges.filter((e) => e.source === id);
  }

  getIncomingEdges(id: string): GraphEdge[] {
    return this.edges.filter((e) => e.target === id);
  }

  getAllNodes(): AnyNode[] {
    return Array.from(this.nodes.values());
  }

  getNodeCount(): number {
    return this.nodes.size;
  }

  getEdgeCount(): number {
    return this.edges.length;
  }

  toSnapshot(): GraphSnapshot {
    return {
      nodes: this.getAllNodes(),
      edges: this.getEdges(),
      rootNodeId: this.rootId,
    };
  }
}
