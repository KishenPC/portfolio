import type { Certification } from "@/lib/types";
import { Section } from "@/components/layout";
import { Body, Heading, Mono, SectionLabel } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import { getCertifications } from "@/lib/data";

/**
 * Certifications — data-driven credentials with credential metadata.
 * Content width (1280px) so the 7/5 split has room to align.
 *
 * Hierarchy matches the approved wireframe: section label → `<h2>` heading →
 * framing line → `divide-y` hairline rows. Each entry is an editorial 7/5
 * grid (`items-baseline`): certification name + issuer on the left (7 cols),
 * completion date + credential link on the right (5 cols, right-aligned on
 * desktop). Credential links open safely in a new tab with
 * `rel="noopener noreferrer"` and a visible `↗` indicator so the new-tab
 * behavior is communicated without relying on the cursor change alone.
 *
 * Status is communicated in text via the date string (e.g. "Completed: MM
 * YYYY" / "In Progress"), never by color or icon alone — per DESIGN.md
 * accessibility rules. In-progress entries without a `credentialUrl` render
 * the date line only. The section heading and framing line are section
 * chrome and use placeholders, consistent with the other section components;
 * real copy arrives with `PERSONAL_INFO.md` content in Task 21. All entry
 * data flows from `certifications.ts` via the typed data layer.
 *
 * Motion (PLAN.md): row fade-up — each row fades up as it enters the
 * viewport with a small incremental delay so adjacent rows cascade. Heading
 * + framing line stay static. Reduced-motion → static, no info loss.
 */
export function Certifications() {
  const certifications = getCertifications();

  return (
    <Section
      id="certifications"
      width="content"
      className="border-b border-line"
    >
      <SectionLabel>06 — Certifications</SectionLabel>

      <Heading as="h2" id="certifications-heading" className="mt-10">
        [Certifications]
      </Heading>

      <Body scale="body" className="mt-6 max-w-reading text-ink-2">
        [Framing line about credentials and ongoing learning.]
      </Body>

      <div className="mt-10 divide-y divide-line border-b border-line">
        {certifications.map((cert, i) => (
          <FadeUp key={`${cert.name}-${i}`} delay={Math.min(i * 0.06, 0.24)}>
            <CertificationEntry cert={cert} />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

interface CertificationEntryProps {
  cert: Certification;
}

function CertificationEntry({ cert }: CertificationEntryProps) {
  return (
    <article className="grid gap-4 py-8 md:grid-cols-12 md:gap-10 md:items-baseline">
      <div className="md:col-span-7">
        <Heading as="h3" scale="card-title">
          {cert.name}
        </Heading>
        <Body scale="body" className="mt-1 text-ink-2">
          {cert.issuer}
        </Body>
      </div>

      <div className="flex flex-col gap-2 md:col-span-5 md:items-end">
        <Mono as="p">{cert.date}</Mono>
        {cert.credentialUrl && cert.status === "completed" ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded py-1 text-body text-ink-2 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Credential
            <span aria-hidden="true" className="ml-0.5">
              {"\u2197"}
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
