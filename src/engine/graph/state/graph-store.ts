export type GraphState = {
  activeNode: string | null;
  hoverNode: string | null;
  expandedNodes: Set<string>;
  breadcrumbs: string[];
  history: string[];
};

export class GraphStore {
  private state: GraphState;

  constructor() {
    this.state = {
      activeNode: null,
      hoverNode: null,
      expandedNodes: new Set<string>(),
      breadcrumbs: [],
      history: [],
    };
  }

  getState(): Readonly<GraphState> {
    return this.state;
  }

  setActiveNode(id: string | null): void {
    this.state.activeNode = id;
    if (id) {
      if (
        this.state.history.length === 0 ||
        this.state.history[this.state.history.length - 1] !== id
      ) {
        this.state.history = [...this.state.history, id];
      }
      if (
        this.state.breadcrumbs.length === 0 ||
        this.state.breadcrumbs[this.state.breadcrumbs.length - 1] !== id
      ) {
        this.state.breadcrumbs = [...this.state.breadcrumbs, id];
      }
    }
  }

  setHoverNode(id: string | null): void {
    this.state.hoverNode = id;
  }

  clearHover(): void {
    this.state.hoverNode = null;
  }

  expand(id: string): void {
    this.state.expandedNodes = new Set([...this.state.expandedNodes, id]);
  }

  collapse(id: string): void {
    const next = new Set(this.state.expandedNodes);
    next.delete(id);
    this.state.expandedNodes = next;
  }

  resetExpansions(): void {
    this.state.expandedNodes = new Set();
  }

  navigateBack(): void {
    if (this.state.history.length > 1) {
      this.state.history = this.state.history.slice(0, -1);
      this.state.activeNode = this.state.history[this.state.history.length - 1];
    }
  }

  reset(): void {
    this.state = {
      activeNode: null,
      hoverNode: null,
      expandedNodes: new Set(),
      breadcrumbs: [],
      history: [],
    };
  }
}
