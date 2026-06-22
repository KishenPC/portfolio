import type { Project } from "@/lib/types";
import { Body, Eyebrow, Heading } from "@/components/typography";
import { Stack } from "@/components/layout";
import {
  KeywordCluster,
  LinkRow,
  MetricRow,
  ProjectDetail,
  ProjectImage,
} from "./index";

export interface FeaturedProjectProps {
  project: Project;
}

/**
 * FeaturedProject — the long-form project template. Renders the full narrative
 * arc: mode label → title → subtitle → keywords → primary screenshot →
 * Context / Approach / Outcome → secondary screenshot → metrics → links →
 * expandable in-page detail.
 *
 * Hierarchy matches the approved wireframe's `FeaturedProject` at content
 * width. Spacing above the reusable sub-components (`KeywordCluster`,
 * `MetricRow`, `LinkRow`) is owned here since those primitives are
 * layout-agnostic. The narrative is a `Stack` with `space-y-8` per wireframe.
 * Content comes entirely from `projects.ts` via props — no hardcoded copy.
 */
export function FeaturedProject({ project }: FeaturedProjectProps) {
  const [primaryScreenshot, secondaryScreenshot] = project.screenshots;

  return (
    <article className="border-t border-line pt-12">
      <Eyebrow as="div" className="mb-4">
        MODE: Featured Narrative
      </Eyebrow>

      <Heading as="h3" scale="project-title">
        {project.title}
      </Heading>

      <Body scale="body" className="mt-3 max-w-reading text-ink-2">
        {project.subtitle}
      </Body>

      <KeywordCluster keywords={project.keywords} className="mt-5" />

      {primaryScreenshot ? (
        <div className="mt-8">
          <ProjectImage image={primaryScreenshot} />
        </div>
      ) : null}

      {project.narrative ? (
        <Stack gap="lg" className="mt-10">
          {project.narrative.map((block) => (
            <div key={block.intent}>
              <Eyebrow as="div" className="mb-2">
                {block.intent}
              </Eyebrow>
              <Heading as="h4">{block.heading}</Heading>
              <Body
                scale="body"
                className="mt-3 max-w-reading text-ink-2 leading-relaxed"
              >
                {block.body}
              </Body>
            </div>
          ))}
        </Stack>
      ) : null}

      {secondaryScreenshot ? (
        <div className="mt-10 max-w-reading">
          <ProjectImage
            image={secondaryScreenshot}
            placeholderLabel="[Secondary screenshot]"
          />
        </div>
      ) : null}

      <MetricRow metrics={project.metrics} className="mt-8" />
      <LinkRow links={project.links} className="mt-8" />

      {project.detail ? (
        <ProjectDetail label="Expandable in-page detail" className="mt-6">
          <Body
            scale="body"
            className="max-w-reading text-ink-2 leading-relaxed"
          >
            {project.detail.mdx}
          </Body>
        </ProjectDetail>
      ) : null}
    </article>
  );
}
