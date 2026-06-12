import type { Project } from "@/content/schemas/project.schema";
import type { Domain } from "@/content/schemas/domain.schema";

export type ProjectWithUrl = Project & {
  url: string;
};

export type DomainWithUrl = Domain & {
  url: string;
};

export function projectWithUrl(project: Project): ProjectWithUrl {
  return {
    ...project,
    url: `/projects/${project.slug}`,
  };
}

export function domainWithUrl(domain: Domain): DomainWithUrl {
  return {
    ...domain,
    url: `/explore/${domain.id}`,
  };
}
