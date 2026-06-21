import type { ReactNode } from "react";

export type StackGap = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const gapClass: Record<StackGap, string> = {
  sm: "space-y-4",
  md: "space-y-6",
  lg: "space-y-8",
  xl: "space-y-10",
  "2xl": "space-y-16",
  "3xl": "space-y-20",
};

export interface StackProps {
  /** Vertical gap between children. @default "lg" (32px) */
  gap?: StackGap;
  className?: string;
  children?: ReactNode;
}

/**
 * Vertical rhythm wrapper for stacking block-level children with consistent
 * spacing. Maps to the wireframe's `space-y-*` scale
 * (4 / 6 / 8 / 10 / 16 / 20).
 */
export function Stack({ gap = "lg", className, children }: StackProps) {
  const classes = [gapClass[gap], className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
