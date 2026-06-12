import type { Project } from "@/content/schemas/project.schema";
import type { Domain } from "@/content/schemas/domain.schema";
import type { TimelineEvent } from "@/content/schemas/timeline.schema";
import type { Architecture } from "@/content/schemas/architecture.schema";

import { contentRegistry } from "@/content/registry";
import {
  projectWithUrl,
  type ProjectWithUrl,
  domainWithUrl,
  type DomainWithUrl,
} from "@/content/transformers";

export function getProjects(): ProjectWithUrl[] {
  return contentRegistry.getProjects().map(projectWithUrl);
}

export function getProject(slug: string): ProjectWithUrl | undefined {
  const project = contentRegistry.getProject(slug);
  if (!project) return undefined;
  return projectWithUrl(project);
}

export function getProjectMdx(slug: string): string | undefined {
  return contentRegistry.getProjectMdx(slug);
}

export function getDomains(): DomainWithUrl[] {
  return contentRegistry.getDomains().map(domainWithUrl);
}

export function getDomain(id: string): DomainWithUrl | undefined {
  const domain = contentRegistry.getDomain(id);
  if (!domain) return undefined;
  return domainWithUrl(domain);
}

export function getTimeline(): TimelineEvent[] {
  return contentRegistry.getTimeline();
}

export function getAllArchitectures(): Architecture[] {
  return contentRegistry.getAllArchitectures();
}

export function getArchitecture(id: string): Architecture | undefined {
  return contentRegistry.getArchitecture(id);
}

export type { Project, Domain, TimelineEvent, Architecture, ProjectWithUrl, DomainWithUrl };
