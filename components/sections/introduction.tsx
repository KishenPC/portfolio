import { Section } from "@/components/layout";
import { Body, Heading, Mono, SectionLabel } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import { getPersonal } from "@/lib/data";

/**
 * Introduction — establishes *how* this person thinks before showing *what*
 * they built. Editorial prose at reading width (720px), one primary focus:
 * the paragraphs. Education is a quiet mono aside.
 *
 * Hierarchy matches the approved wireframe: section label → `<h2>` heading
 * → intro paragraphs → education aside. Body text is `#111111` on `#FFFFFF`
 * per PLAN.md accessibility requirements (primary text for body copy, per
 * DESIGN.md Accessibility Rules).
 *
 * Motion (PLAN.md): paragraph fade-up on enter; education aside follows with
 * a small delay. Heading stays static as the section anchor. Reduced-motion
 * → static, no info loss. One active animation per viewport.
 */
export function Introduction() {
  const personal = getPersonal();
  const { education } = personal;
  return (
    <Section id="intro" width="reading" className="border-b border-line">
      <SectionLabel>01 — Introduction</SectionLabel>
      <Heading as="h2" id="intro-heading" className="mt-10">
        [Introduction]
      </Heading>
      <FadeUp className="mt-10">
        <div className="space-y-6">
          {personal.intro.map((paragraph) => (
            <Body key={paragraph} scale="body" className="leading-relaxed">
              {paragraph}
            </Body>
          ))}
        </div>
      </FadeUp>
      <FadeUp delay={0.15} className="mt-10">
        <Mono as="p">
          Education: {education.degree} {education.field}, {education.status}
        </Mono>
      </FadeUp>
    </Section>
  );
}
