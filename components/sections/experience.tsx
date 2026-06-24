import { Section, Stack } from "@/components/layout";
import { Body, Heading, Mono, SectionLabel } from "@/components/typography";
import { FadeUp, RevealText } from "@/components/motion";
import { getExperience } from "@/lib/data";

/**
 * Experience — editorial prose about *how* this person works beyond project
 * artifacts. Reading width (720px) so the summary and highlights read as
 * authored voice, not a corporate resume block.
 *
 * Hierarchy matches the approved wireframe: section label → `<h2>` heading →
 * per-entry block (`<h3>` role · org → mono period → summary → highlights
 * list). The section heading is section chrome and uses a placeholder,
 * consistent with the Introduction component; real copy arrives with
 * `PERSONAL_INFO.md` content in Task 21. All entry content flows from
 * `experience.ts` via the typed data layer.
 *
 * Highlights render as a semantic `<ul>` (list-disc, list-inside) so
 * screen-readers announce them as a related group; the muted marker keeps
 * the visual rhythm quiet per DESIGN.md restraint principles.
 *
 * Motion (PLAN.md): fade-up on each entry block as it enters the viewport.
 * Heading stays static. Reduced-motion → static, no info loss.
 */
export function Experience() {
  const entries = getExperience();

  return (
    <Section id="experience" width="reading" className="border-b border-line bg-surface">
      <SectionLabel>03 — Experience</SectionLabel>

      <Heading as="h2" id="experience-heading" className="mt-10">
        <RevealText text="[Experience]" />
      </Heading>

      <Stack gap="xl" className="mt-10">
        {entries.map((entry, i) => (
          <FadeUp key={`${entry.role}-${entry.org}-${i}`}>
            <Heading as="h3" scale="card-title">
              {entry.role} · {entry.org}
            </Heading>

            <Mono as="p" className="mt-2">
              {entry.period}
            </Mono>

            <Body
              scale="large"
              className="mt-4 text-ink-2 leading-relaxed"
            >
              {entry.summary}
            </Body>

            <ul className="mt-8 space-y-3 list-disc list-inside marker:text-ink-3">
              {entry.highlights.map((highlight) => (
                <Body
                  as="li"
                  key={highlight}
                  scale="large"
                  className="text-ink-2 leading-relaxed"
                >
                  {highlight}
                </Body>
              ))}
            </ul>
          </FadeUp>
        ))}
      </Stack>
    </Section>
  );
}
