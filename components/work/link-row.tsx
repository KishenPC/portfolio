import type { ProjectLink } from "@/lib/types";
import { MagneticLink } from "@/lib/motion/magnetic-link";

/**
 * LinkRow — the project's outbound links (GitHub / Live / Case Study).
 * Mirrors the frozen wireframe's underline-offset link row while upgrading
 * it for accessibility: visible focus ring (accent), touch-friendly vertical
 * padding, and safe external-link attributes (`target="_blank"` +
 * `rel="noopener noreferrer"`) with a visual `↗` indicator so the new-tab
 * behavior is communicated without relying on the cursor change alone.
 *
 * GitHub/Live are treated as external. Case-study links render as in-page
 * anchors (no new tab) since they may resolve to an in-page disclosure.
 * Spacing above the row is owned by the consumer.
 *
 * **Magnetic mode (`magnetic` prop):** When enabled, each link renders as a
 * `MagneticLink` client component instead of a plain `<a>`. The magnetic
 * effect is desktop-only (gated by `(pointer: fine)` inside MagneticLink) and
 * disabled for reduced-motion users — touch devices and reduced-motion users
 * get a plain `<a>` with identical styling and accessibility. Used by
 * EditorialProject (PLAN.md: "Work Editorial — magnetic links"). Not used by
 * FeaturedProject.
 */
export interface LinkRowProps {
  links: ProjectLink[];
  /** When true, links render as `MagneticLink` (desktop magnetic effect). */
  magnetic?: boolean;
  className?: string;
}

export function LinkRow({ links, magnetic = false, className }: LinkRowProps) {
  const classes = ["flex flex-wrap gap-6", className].filter(Boolean).join(" ");
  const linkClass =
    "inline-block rounded py-1 text-body text-ink-2 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <ul className={classes}>
      {links.map((link) => {
        const external = link.kind === "github" || link.kind === "live";
        const externalProps = external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {};
        const content = (
          <>
            {link.label}
            {external ? (
              <span aria-hidden="true" className="ml-0.5">
                {"\u2197"}
              </span>
            ) : null}
          </>
        );

        return (
          <li key={link.label}>
            {magnetic ? (
              <MagneticLink href={link.href} className={linkClass} {...externalProps}>
                {content}
              </MagneticLink>
            ) : (
              <a href={link.href} className={linkClass} {...externalProps}>
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
