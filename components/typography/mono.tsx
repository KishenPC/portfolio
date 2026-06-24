import type { ReactNode } from "react";

export type MonoAs = "span" | "p" | "div" | "time";

export interface MonoProps {
  /** @default "span" */
  as?: MonoAs;
  className?: string;
  children?: ReactNode;
}

/**
 * Monospace text primitive for timestamps, indicators, and short technical
 * labels. Defaults to muted `text-ink-3` at caption scale — the only
 * permitted uses of muted text per DESIGN.md Accessibility Rules. Override
 * color/scale via `className` when context demands it.
 */
export function Mono({ as = "span", className, children }: MonoProps) {
  const classes = ["font-mono text-ink-3 text-caption", className]
    .filter(Boolean)
    .join(" ");
  const Component = as;
  return <Component className={classes}>{children}</Component>;
}
