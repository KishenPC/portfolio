import type { ReactNode } from "react";

export interface BleedProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Breaks a child out of its parent `Container` to the full viewport width.
 * Use for full-bleed media inside a constrained section.
 *
 * Ensure no ancestor between this element and the viewport root applies
 * `overflow-x-hidden`/`overflow-x-clip`, otherwise the breakout is clipped.
 * (A scrollbar-width horizontal overflow may appear on desktops with visible
 * scrollbars; address at the body level if needed.)
 */
export function Bleed({ className, children }: BleedProps) {
  const classes = ["relative left-1/2 -ml-[50vw] w-screen", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
