import type { ReactNode } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";
export type HeadingScale =
  | "hero"
  | "section-heading"
  | "project-title"
  | "card-title";

const scaleClass: Record<HeadingScale, string> = {
  hero: "text-hero",
  "section-heading": "text-section-heading",
  "project-title": "text-project-title",
  "card-title": "text-card-title",
};

const defaultScaleForLevel: Record<HeadingLevel, HeadingScale> = {
  h1: "hero",
  h2: "section-heading",
  h3: "project-title",
  h4: "card-title",
};

export interface HeadingProps {
  /**
   * Semantic heading level. Also sets the default visual scale when `scale`
   * is omitted (h1→hero, h2→section-heading, h3→project-title, h4→card-title).
   *
   * @default "h2"
   */
  as?: HeadingLevel;
  /**
   * Visual type scale, independent of the semantic level. Lets you render a
   * section-heading-scale title as an `<h3>` when the outline demands it.
   */
  scale?: HeadingScale;
  /** Required for `aria-labelledby` wiring on the parent `Section`. */
  id?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Display heading. Always `font-display font-bold tracking-tight`. Size comes
 * from the `--text-*` fluid tokens in `globals.css` (clamp-based, per
 * DESIGN.md Typography Scale). No raw sizes.
 */
export function Heading({
  as = "h2",
  scale,
  id,
  className,
  children,
}: HeadingProps) {
  const resolvedScale = scale ?? defaultScaleForLevel[as];
  const classes = [
    "font-display font-bold tracking-tight",
    scaleClass[resolvedScale],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const Component = as;
  return (
    <Component id={id} className={classes}>
      {children}
    </Component>
  );
}
