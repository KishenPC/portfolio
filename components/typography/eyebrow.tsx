import type { ReactNode } from "react";

export type EyebrowAs = "span" | "div" | "p";

export interface EyebrowProps {
  /** @default "span" */
  as?: EyebrowAs;
  className?: string;
  children?: ReactNode;
}

/**
 * Plain eyebrow label: monospace, uppercase, tracked, muted. Used for inline
 * category labels above content (e.g. `MODE: Editorial`, `Context`,
 * `Elsewhere`). For the bordered pill that opens a section, use
 * `SectionLabel` instead.
 */
export function Eyebrow({ as = "span", className, children }: EyebrowProps) {
  const classes = [
    "font-mono uppercase tracking-wider text-ink-3 text-caption",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const Component = as;
  return <Component className={classes}>{children}</Component>;
}
