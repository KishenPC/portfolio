import { Section, Stack } from "@/components/layout";
import { Body, Heading, SectionLabel } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import { getStack } from "@/lib/data";
import { StackGroup } from "./stack-group";

/**
 * SkillStack — the technologies used across the work, grouped by category.
 * Content width (1280px) so the logo grids have room to breathe.
 *
 * Hierarchy matches the approved wireframe: section label → `<h2>` heading →
 * framing line → group stack with `space-y-10` vertical rhythm. The section
 * heading and framing line are section chrome and use placeholders, consistent
 * with the Introduction / Experience components; real copy arrives with
 * `PERSONAL_INFO.md` content in Task 21. All group and item data flows from
 * `stack.ts` via the typed data layer.
 *
 * No skill bars, ratings, percentages, or logo walls without structure — the
 * grouped definition-list rhythm keeps this scannable and avoids the
 * AI-portfolio tells listed in DESIGN.md.
 *
 * Motion (PLAN.md): staggered group reveal — each group fades up as it
 * enters the viewport, with a small incremental delay so adjacent groups
 * cascade when several are in view at once. Heading + framing line stay
 * static. Reduced-motion → static, no info loss.
 */
export function SkillStack() {
  const groups = getStack();

  return (
    <Section id="stack" width="content" className="border-b border-line">
      <SectionLabel>04 — Skill Stack</SectionLabel>

      <Heading as="h2" id="stack-heading" className="mt-10">
        [Skill Stack]
      </Heading>

      <Body scale="body" className="mt-6 max-w-reading text-ink-2">
        [Framing line describing the technologies used across the work.]
      </Body>

      <Stack gap="xl" className="mt-16">
        {groups.map((group, i) => (
          <FadeUp key={group.name} delay={Math.min(i * 0.06, 0.24)}>
            <StackGroup group={group} />
          </FadeUp>
        ))}
      </Stack>
    </Section>
  );
}
