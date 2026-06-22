import { Section } from "@/components/layout";
import { Heading, Mono, SectionLabel } from "@/components/typography";
import { FadeUp, RevealText } from "@/components/motion";
import { getAwards } from "@/lib/data";

/**
 * Awards — compact recognition. Reading width (720px) so the entries read as
 * a quiet, scannable list rather than a trophy case.
 *
 * Hierarchy matches the approved wireframe's `Recognition`: section label →
 * `<h2>` heading → semantic `<ul>` of entries, each with an `<h3>` award name
 * and a mono caption result. No medal graphics, no count-ups, no decorative
 * icons — per DESIGN.md AI-portfolio prevention rules and Forbidden Motion.
 * The muted mono caption is the only permitted use of `text-ink-3` here (a
 * short result/competition indicator, not paragraph copy).
 *
 * The section heading is section chrome and uses a placeholder, consistent
 * with the Introduction / Experience / SkillStack components; real copy
 * arrives with `PERSONAL_INFO.md` content in Task 21. All award data flows
 * from `awards.ts` via the typed data layer.
 *
 * Motion (PLAN.md): minimal fade-up on the list as it enters the viewport.
 * Heading stays static. Reduced-motion → static, no info loss.
 */
export function Awards() {
  const awards = getAwards();

  return (
    <Section id="recognition" width="reading" className="border-b border-line bg-surface">
      <SectionLabel>05 — Recognition</SectionLabel>

      <Heading as="h2" id="recognition-heading" className="mt-10">
        <RevealText text="[Recognition]" />
      </Heading>

      <FadeUp className="mt-10">
        <ul className="space-y-8">
          {awards.map((award, i) => (
            <li key={`${award.name}-${i}`}>
              <Heading as="h3" scale="card-title">
                {award.name}
              </Heading>
              <Mono as="p" className="mt-1">
                {award.result}
              </Mono>
            </li>
          ))}
        </ul>
      </FadeUp>
    </Section>
  );
}
