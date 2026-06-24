import { Section, Stack } from "@/components/layout";
import { Body, Heading, SectionLabel } from "@/components/typography";
import { RevealText } from "@/components/motion";
import { getProjects } from "@/lib/data";
import { FeaturedProject } from "./featured-project";
import { EditorialProject } from "./editorial-project";

/**
 * SelectedWork — the project showcase section. Composes 2 featured + 2
 * editorial projects from `projects.ts`, branching on `project.mode`.
 *
 * Hierarchy matches the approved wireframe: section label → `<h2>` heading →
 * framing line → project stack with `space-y-20` vertical rhythm. The section
 * heading and framing line are section chrome (not project content) and use
 * placeholders matching the wireframe, consistent with the Introduction
 * component's approach — real copy arrives with `PERSONAL_INFO.md` content in
 * Task 21. No hardcoded project content in JSX; everything flows from the
 * typed data layer.
 */
export function SelectedWork() {
  const projects = getProjects();

  return (
    <Section id="work" width="content" className="border-b border-line">
      <SectionLabel>02 — Selected Work</SectionLabel>

      <Heading as="h2" id="work-heading" className="mt-10">
        <RevealText text="[Selected Work]" />
      </Heading>

      <Body scale="body" className="mt-6 max-w-reading text-ink-2">
        [Framing line introducing the body of work.]
      </Body>

      <Stack gap="3xl" className="mt-12">
        {projects.map((project) =>
          project.mode === "featured" ? (
            <FeaturedProject key={project.slug} project={project} />
          ) : (
            <EditorialProject key={project.slug} project={project} />
          ),
        )}
      </Stack>
    </Section>
  );
}
