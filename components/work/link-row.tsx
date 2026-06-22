import type { ProjectLink } from "@/lib/types";

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
 */
export interface LinkRowProps {
  links: ProjectLink[];
  className?: string;
}

export function LinkRow({ links, className }: LinkRowProps) {
  const classes = ["flex flex-wrap gap-6", className].filter(Boolean).join(" ");
  return (
    <ul className={classes}>
      {links.map((link) => {
        const external = link.kind === "github" || link.kind === "live";
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-block rounded py-1 text-body text-ink-2 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
              {external ? (
                <span aria-hidden="true" className="ml-0.5">
                  {"\u2197"}
                </span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
