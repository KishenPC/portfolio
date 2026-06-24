import type { ReactNode } from "react";

export type SectionLabelAs = "div" | "span";

export interface SectionLabelProps {
  /** @default "div" */
  as?: SectionLabelAs;
  className?: string;
  children?: ReactNode;
}

/**
 * Bordered section label pill (e.g. `01 — Introduction`, `02 — Selected
 * Work`). Mirrors the wireframe's section opener: monospace, uppercase,
 * tracked, muted, hairline border, `inline-block` with `px-2 py-1`.
 * Spacing below the pill is left to the consumer.
 */
export function SectionLabel({
  as = "div",
  className,
  children,
}: SectionLabelProps) {
  const classes = [
    "font-mono uppercase tracking-wider text-ink-3 text-caption border border-line inline-block px-2 py-1",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const Component = as;
  return <Component className={classes}>{children}</Component>;
}
