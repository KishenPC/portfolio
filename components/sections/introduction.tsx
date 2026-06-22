import { Section } from "@/components/layout";
import { Body, Heading, Mono, SectionLabel } from "@/components/typography";
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
      <div className="mt-10 space-y-6">
        {personal.intro.map((paragraph) => (
          <Body key={paragraph} scale="body" className="leading-relaxed">
            {paragraph}
          </Body>
        ))}
      </div>
      <Mono as="p" className="mt-10">
        Education: {education.degree} {education.field}, {education.status}
      </Mono>
    </Section>
  );
}
