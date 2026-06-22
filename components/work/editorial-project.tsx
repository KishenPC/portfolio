import type { Project } from "@/lib/types";
import { Body, Eyebrow, Heading } from "@/components/typography";
import { KeywordCluster, LinkRow, MetricRow, ProjectImage } from "./index";

export interface EditorialProjectProps {
  project: Project;
}

/**
 * EditorialProject — the compact project template. Renders an asymmetric 7/5
 * grid: screenshot on the left (7 cols), title → summary → keywords → metrics
 * → links on the right (5 cols).
 *
 * Hierarchy matches the approved wireframe's `EditorialProject`. The title
 * uses the `card-title` scale (smaller than `FeaturedProject`'s
 * `project-title`) to preserve the wireframe's hierarchy where featured
 * projects dominate and editorial projects recede. No narrative arc, no
 * expandable detail — just the essentials. Content comes entirely from
 * `projects.ts` via props.
 */
export function EditorialProject({ project }: EditorialProjectProps) {
  const [screenshot] = project.screenshots;

  return (
    <article className="border-t border-line pt-12">
      <Eyebrow as="div" className="mb-4">
        MODE: Editorial
      </Eyebrow>

      <div className="grid gap-8 md:grid-cols-12 md:items-start">
        <div className="md:col-span-7">
          {screenshot ? <ProjectImage image={screenshot} /> : null}
        </div>

        <div className="md:col-span-5">
          <Heading as="h3" scale="card-title">
            {project.title}
          </Heading>

          <Body scale="body" className="mt-3 text-ink-2 leading-relaxed">
            {project.summary}
          </Body>

          <KeywordCluster keywords={project.keywords} className="mt-5" />
          <MetricRow metrics={project.metrics} className="mt-8" />
          <LinkRow links={project.links} className="mt-8" />
        </div>
      </div>
    </article>
  );
}
