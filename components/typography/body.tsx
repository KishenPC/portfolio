import type { ReactNode } from "react";

export type BodyScale = "large" | "body" | "caption";
export type BodyAs = "p" | "span" | "div" | "li";

const scaleClass: Record<BodyScale, string> = {
  large: "text-large-body",
  body: "text-body",
  caption: "text-caption",
};

export interface BodyProps {
  /**
   * Element to render. Use `span` for inline runs, `li` for list items,
   * `div` for block groupings that shouldn't be paragraphs.
   *
   * @default "p"
   */
  as?: BodyAs;
  /**
   * Fluid type scale token. `large` → 20–24px, `body` → 16–18px,
   * `caption` → 12–14px.
   *
   * @default "body"
   */
  scale?: BodyScale;
  className?: string;
  children?: ReactNode;
}

/**
 * Body text primitive. Color is intentionally not baked in — it inherits
 * `text-ink` (#1A1612, primary) from the root, per DESIGN.md Accessibility
 * Rules. Pass `text-ink-2` via `className` for secondary/supporting copy
 * (descriptions, summaries, metadata).
 */
export function Body({
  as = "p",
  scale = "body",
  className,
  children,
}: BodyProps) {
  const classes = [scaleClass[scale], className].filter(Boolean).join(" ");
  const Component = as;
  return <Component className={classes}>{children}</Component>;
}
