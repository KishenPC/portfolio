export type EdgeType =
  | "contains"
  | "references"
  | "belongs_to"
  | "related_to"
  | "created_in"
  | "expands_to";

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
}
