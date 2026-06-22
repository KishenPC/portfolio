import { Section } from "@/components/layout";
import { Body, Eyebrow, Heading, Mono, SectionLabel } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import { MagneticLink } from "@/lib/motion/magnetic-link";
import { LetsConnect } from "@/components/contact/lets-connect";
import { getPersonal } from "@/lib/data";

/**
 * Connect — the closing section. Invites connection via a contact form
 * (left, 7 cols) and elsewhere links (right, 5 cols), with the footer below.
 *
 * Hierarchy matches the approved wireframe's `LetsConnectSection`: section
 * label → `<h2>` heading → framing line → two-column grid (form 7 /
 * elsewhere 5) → footer (name · © year | built-with note). The form is a
 * client component (`LetsConnect`); this section is a server component that
 * resolves the contact email from `personal.ts` (env-based) and passes it in
 * as a prop so the data layer stays out of the client bundle — mirroring the
 * `SiteNav` pattern.
 *
 * Elsewhere links (GitHub, LinkedIn, Email) come from `personal.ts`. Email is
 * a `mailto:` link; GitHub/LinkedIn open safely in a new tab with
 * `rel="noopener noreferrer"` and a visible `↗` indicator. The footer year
 * is rendered at build time (static site) — acceptable for a portfolio that
 * rebuilds on content changes.
 *
 * The section heading and framing line are section chrome and use
 * placeholders, consistent with the other section components; real copy
 * arrives with `PERSONAL_INFO.md` content in Task 21.
 *
 * Motion (PLAN.md):
 * - Closing fade-up on the form/elsewhere grid, then the footer follows with
 *   a small delay. Heading + framing line stay static.
 * - Magnetic links on the elsewhere section (desktop-only, gated by
 *   `(pointer: fine)` inside `MagneticLink`; touch / reduced-motion → plain
 *   `<a>` with identical styling).
 * Reduced-motion → static, no info loss.
 */
export function Connect() {
  const personal = getPersonal();
  const year = new Date().getFullYear();

  const elsewhere = [
    { label: "GitHub", href: personal.github, external: true },
    { label: "LinkedIn", href: personal.linkedin, external: true },
    { label: "Email", href: `mailto:${personal.email}`, external: false },
  ];

  const linkClass =
    "inline-block rounded py-1 text-large-body text-ink-2 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <Section id="connect" width="content" className="border-b border-line">
      <SectionLabel>07 — Let&apos;s Connect</SectionLabel>

      <Heading as="h2" id="connect-heading" className="mt-10">
        [Let&apos;s Connect]
      </Heading>

      <Body scale="body" className="mt-6 max-w-reading text-ink-2">
        [Closing line inviting connection — open to opportunities,
        collaboration, or a conversation about building things.]
      </Body>

      <FadeUp className="mt-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <LetsConnect email={personal.email} />
          </div>

          <div className="md:col-span-5">
            <Eyebrow as="div" className="mb-4">
              Elsewhere
            </Eyebrow>
            <ul className="space-y-4">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <MagneticLink
                    href={link.href}
                    className={linkClass}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {link.external ? (
                      <span aria-hidden="true" className="ml-0.5">
                        {"\u2197"}
                      </span>
                    ) : null}
                  </MagneticLink>
                </li>
              ))}
            </ul>
            <Mono as="p" className="mt-8">
              [Prefer email? The form opens your mail client with everything
              prefilled.]
            </Mono>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <footer className="mt-32 flex flex-wrap justify-between gap-4 border-t border-line pt-10 font-mono text-caption text-ink-3">
          <span>
            {personal.name} · © {year}
          </span>
          <span>[Built with note]</span>
        </footer>
      </FadeUp>
    </Section>
  );
}
