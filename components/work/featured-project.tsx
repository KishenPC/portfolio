import type { Project } from "@/lib/types";
import { Body, Eyebrow, Heading } from "@/components/typography";
import { Stack } from "@/components/layout";
import { FadeUp, MaskReveal } from "@/components/motion";
import { PinnedNarrative } from "@/lib/motion/pinned-narrative";
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
 *
 * Motion (PLAN.md Work Featured):
 * - **Pinned scroll progression:** The primary screenshot + narrative are
 *   wrapped in `PinnedNarrative`. On desktop (lg+), the screenshot pins on
 *   the left (5 cols) while the narrative blocks (Context / Approach /
 *   Outcome) scroll past on the right (7 cols) — the classic editorial
 *   pinned-storytelling pattern. On mobile, it collapses to the wireframe's
 *   single-column static stack (screenshot above narrative). Reduced-motion →
 *   no pinning, two-column layout remains but screenshot scrolls normally.
 * - **Image mask reveals:** Both screenshots are wrapped in `MaskReveal` — a
 *   bottom-to-top wipe on enter.
 * - **Progressive disclosure:** Each narrative block is wrapped in `FadeUp`
 *   with an incremental delay so blocks cascade as they enter the viewport.
 * - Metrics, links, and detail are static (no motion) — they sit below the
 *   pinned section in normal flow.
 */
export function FeaturedProject({ project }: FeaturedProjectProps) {
  const [primaryScreenshot, secondaryScreenshot] = project.screenshots;
  const hasPinnedContent = Boolean(primaryScreenshot && project.narrative);

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

      {hasPinnedContent ? (
        <PinnedNarrative
          screenshot={
            <MaskReveal>
              <ProjectImage image={primaryScreenshot!} />
            </MaskReveal>
          }
          narrative={
            <Stack gap="lg">
              {project.narrative!.map((block, i) => (
                <FadeUp key={`${block.intent}-${i}`} delay={Math.min(i * 0.1, 0.3)}>
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
                </FadeUp>
              ))}
            </Stack>
          }
        />
      ) : (
        <>
          {primaryScreenshot ? (
            <div className="mt-8">
              <MaskReveal>
                <ProjectImage image={primaryScreenshot} />
              </MaskReveal>
            </div>
          ) : null}

          {project.narrative ? (
            <Stack gap="lg" className="mt-10">
              {project.narrative.map((block, i) => (
                <FadeUp key={`${block.intent}-${i}`} delay={Math.min(i * 0.1, 0.3)}>
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
                </FadeUp>
              ))}
            </Stack>
          ) : null}
        </>
      )}

      {secondaryScreenshot ? (
        <div className="mt-10 max-w-reading">
          <MaskReveal>
            <ProjectImage
              image={secondaryScreenshot}
              placeholderLabel="[Secondary screenshot]"
            />
          </MaskReveal>
        </div>
      ) : null}

      <FadeUp className="mt-8">
        <MetricRow metrics={project.metrics} />
      </FadeUp>
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
