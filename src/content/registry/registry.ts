import type { Project } from "@/content/schemas/project.schema";
import type { Domain } from "@/content/schemas/domain.schema";
import type { TimelineEvent } from "@/content/schemas/timeline.schema";
import type { Architecture } from "@/content/schemas/architecture.schema";

import { loadProjects, loadProjectMdx } from "@/content/loaders/projects.loader";
import { loadDomains } from "@/content/loaders/domains.loader";
import { loadTimeline } from "@/content/loaders/timeline.loader";
import { loadAllArchitectures } from "@/content/loaders/architecture.loader";

export class ContentRegistry {
  private projects: Map<string, Project> = new Map();
  private domains: Map<string, Domain> = new Map();
  private timeline: TimelineEvent[] = [];
  private architectures: Map<string, Architecture> = new Map();
  private mdxSources: Map<string, string> = new Map();
  private initialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.initialized) return;
    this.initialized = true;

    for (const project of loadProjects()) {
      this.projects.set(project.slug, project);
    }

    for (const domain of loadDomains()) {
      this.domains.set(domain.id, domain);
    }

    this.timeline = loadTimeline();

    for (const arch of loadAllArchitectures()) {
      this.architectures.set(arch.metadata.title.toLowerCase().replace(/\s+/g, "-"), arch);
    }
  }

  getProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  getProject(slug: string): Project | undefined {
    return this.projects.get(slug);
  }

  getProjectMdx(slug: string): string | undefined {
    if (!this.mdxSources.has(slug)) {
      const source = loadProjectMdx(slug);
      if (source) {
        this.mdxSources.set(slug, source);
      }
    }
    return this.mdxSources.get(slug);
  }

  getDomains(): Domain[] {
    return Array.from(this.domains.values());
  }

  getDomain(id: string): Domain | undefined {
    return this.domains.get(id);
  }

  getTimeline(): TimelineEvent[] {
    return this.timeline;
  }

  getAllArchitectures(): Architecture[] {
    return Array.from(this.architectures.values());
  }

  getArchitecture(id: string): Architecture | undefined {
    return this.architectures.get(id);
  }
}

export const contentRegistry = new ContentRegistry();
