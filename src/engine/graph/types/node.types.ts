import type { Project, Domain, TimelineEvent, Architecture } from "@/content/schemas";

export type NodeType = "root" | "domain" | "project" | "architecture" | "timeline" | "skill";

export interface GraphNode<T = unknown> {
  id: string;
  type: NodeType;
  label: string;
  data: T;
}

export interface RootNode extends GraphNode<{ description: string }> {
  type: "root";
}

export interface DomainNode extends GraphNode<Domain> {
  type: "domain";
}

export interface ProjectNode extends GraphNode<Project> {
  type: "project";
}

export interface ArchitectureNode extends GraphNode<Architecture> {
  type: "architecture";
}

export interface TimelineNode extends GraphNode<TimelineEvent> {
  type: "timeline";
}

export interface SkillNode extends GraphNode<{ name: string }> {
  type: "skill";
}

export type AnyNode =
  | RootNode
  | DomainNode
  | ProjectNode
  | ArchitectureNode
  | TimelineNode
  | SkillNode;
