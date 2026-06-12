import { Graph } from "../core/graph";
import type {
  RootNode,
  DomainNode,
  ProjectNode,
  ArchitectureNode,
  TimelineNode,
  SkillNode,
} from "../types/node.types";

import { getProjects, getDomains, getTimeline, getArchitecture } from "@/content/api";

function edgeId(source: string, type: string, target: string): string {
  return `${source}--${type}-->${target}`;
}

export function buildKnowledgeGraph(): Graph {
  const graph = new Graph("root");

  const root: RootNode = {
    id: "root",
    type: "root",
    label: "Portfolio",
    data: { description: "Interactive engineering portfolio" },
  };
  graph.addNode(root);

  const domains = getDomains();
  const projects = getProjects();
  const timeline = getTimeline();

  const skillNodes = new Map<string, SkillNode>();
  const addSkillNode = (name: string): SkillNode => {
    const id = `skill:${name.toLowerCase().replace(/\s+/g, "-")}`;
    if (!skillNodes.has(id)) {
      const node: SkillNode = {
        id,
        type: "skill",
        label: name,
        data: { name },
      };
      skillNodes.set(id, node);
      graph.addNode(node);
    }
    return skillNodes.get(id)!;
  };

  for (const domain of domains) {
    const domainNode: DomainNode = {
      id: `domain:${domain.id}`,
      type: "domain",
      label: domain.title,
      data: domain,
    };
    graph.addNode(domainNode);

    graph.addEdge({
      id: edgeId(root.id, "contains", domainNode.id),
      source: root.id,
      target: domainNode.id,
      type: "contains",
    });

    if (domain.skills) {
      for (const skill of domain.skills) {
        const skillNode = addSkillNode(skill);
        graph.addEdge({
          id: edgeId(domainNode.id, "references", skillNode.id),
          source: domainNode.id,
          target: skillNode.id,
          type: "references",
        });
      }
    }
  }

  for (const project of projects) {
    const projectNode: ProjectNode = {
      id: `project:${project.slug}`,
      type: "project",
      label: project.title,
      data: project,
    };
    graph.addNode(projectNode);

    const domainId = `domain:${project.domain}`;
    if (graph.hasNode(domainId)) {
      graph.addEdge({
        id: edgeId(domainId, "contains", projectNode.id),
        source: domainId,
        target: projectNode.id,
        type: "contains",
      });

      graph.addEdge({
        id: edgeId(projectNode.id, "belongs_to", domainId),
        source: projectNode.id,
        target: domainId,
        type: "belongs_to",
      });
    }

    for (const tech of project.tech) {
      const skillNode = addSkillNode(tech);
      graph.addEdge({
        id: edgeId(projectNode.id, "references", skillNode.id),
        source: projectNode.id,
        target: skillNode.id,
        type: "references",
      });
    }

    if (project.architectureRef) {
      const archData = getArchitecture(project.architectureRef);
      if (archData) {
        const archNodeId = `architecture:${project.architectureRef}`;
        const archNode: ArchitectureNode = {
          id: archNodeId,
          type: "architecture",
          label: archData.metadata.title,
          data: archData,
        };
        graph.addNode(archNode);

        graph.addEdge({
          id: edgeId(projectNode.id, "expands_to", archNodeId),
          source: projectNode.id,
          target: archNodeId,
          type: "expands_to",
        });

        graph.addEdge({
          id: edgeId(archNodeId, "belongs_to", domainId),
          source: archNodeId,
          target: domainId,
          type: "belongs_to",
        });

        for (const archNodeData of archData.nodes) {
          const childId = `arch-node:${archNodeData.id}`;
          const childNode: ArchitectureNode = {
            id: childId,
            type: "architecture",
            label: archNodeData.label,
            data: archData,
          };
          graph.addNode(childNode);

          graph.addEdge({
            id: edgeId(archNodeId, "contains", childId),
            source: archNodeId,
            target: childId,
            type: "contains",
          });
        }

        for (const archEdge of archData.edges) {
          const sourceId = `arch-node:${archEdge.source}`;
          const targetId = `arch-node:${archEdge.target}`;

          if (graph.hasNode(sourceId) && graph.hasNode(targetId)) {
            graph.addEdge({
              id: edgeId(sourceId, "related_to", targetId),
              source: sourceId,
              target: targetId,
              type: "related_to",
              label: archEdge.label,
            });
          }
        }
      }
    }
  }

  for (const event of timeline) {
    const timelineId = `timeline:${event.year}-${event.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`;
    const timelineNode: TimelineNode = {
      id: timelineId,
      type: "timeline",
      label: `${event.year}: ${event.title}`,
      data: event,
    };
    graph.addNode(timelineNode);

    graph.addEdge({
      id: edgeId(root.id, "contains", timelineId),
      source: root.id,
      target: timelineId,
      type: "contains",
    });

    for (const projectSlug of event.relatedProjects) {
      const projectId = `project:${projectSlug}`;
      if (graph.hasNode(projectId)) {
        graph.addEdge({
          id: edgeId(timelineId, "created_in", projectId),
          source: timelineId,
          target: projectId,
          type: "created_in",
        });

        graph.addEdge({
          id: edgeId(projectId, "related_to", timelineId),
          source: projectId,
          target: timelineId,
          type: "related_to",
        });
      }
    }
  }

  return graph;
}
