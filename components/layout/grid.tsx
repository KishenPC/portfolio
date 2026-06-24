import type { ReactNode } from "react";

export type GridCols = 4 | 8 | 12;
export type GridGap = "sm" | "md" | "lg" | "xl";

const colsClass: Record<GridCols, string> = {
  4: "grid-cols-4",
  8: "grid-cols-8",
  12: "grid-cols-12",
};

const gapClass: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
};

export interface GridProps {
  /**
   * Pin to a single column count at all breakpoints. When omitted, the grid
   * is responsive: 4 (mobile) → 8 (tablet) → 12 (desktop) per DESIGN.md.
   */
  cols?: GridCols;
  /** Gap between cells. @default "lg" (32px) */
  gap?: GridGap;
  className?: string;
  children?: ReactNode;
}

/**
 * Responsive grid aligned to DESIGN.md's column system
 * (4 / 8 / 12 across mobile / tablet / desktop). Pass `cols` to pin to a
 * fixed count. Children position themselves with `col-span-*` utilities.
 */
export function Grid({ cols, gap = "lg", className, children }: GridProps) {
  const colsCls = cols
    ? colsClass[cols]
    : "grid-cols-4 md:grid-cols-8 lg:grid-cols-12";
  const classes = ["grid", colsCls, gapClass[gap], className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
