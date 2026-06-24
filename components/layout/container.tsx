import type { ReactNode } from "react";

export type ContainerWidth = "reading" | "content" | "wide";

const widthClass: Record<ContainerWidth, string> = {
  reading: "max-w-reading",
  content: "max-w-content",
  wide: "max-w-wide",
};

export interface ContainerProps {
  /**
   * Maximum content width. Maps to the `--container-*` design tokens.
   *
   * - `reading`  → 720px  (long-form prose, narrow columns)
   * - `content`  → 1280px (default, most sections)
   * - `wide`     → 1440px (full-bleed galleries, large media)
   *
   * @default "content"
   */
  width?: ContainerWidth;
  /** Additional classes merged after the width/padding classes. */
  className?: string;
  children?: ReactNode;
}

/**
 * Centers content horizontally with a fixed maximum width and consistent
 * horizontal padding (`px-6`). Use as the inner width controller of a
 * `Section`, or standalone inside a custom layout.
 */
export function Container({
  width = "content",
  className,
  children,
}: ContainerProps) {
  const classes = ["mx-auto px-6 w-full", widthClass[width], className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
