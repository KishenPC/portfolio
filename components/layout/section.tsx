import type { ReactNode } from "react";
import { Container, type ContainerWidth } from "./container";

export interface SectionProps {
  /**
   * Section id. When provided, `aria-labelledby` automatically targets
   * `${id}-heading` — give the section's heading that exact id.
   */
  id?: string;
  /**
   * Explicit id of the heading that labels this section. Overrides the
   * `${id}-heading` default. Pass `null` to opt out of labelling.
   */
  labelledById?: string;
  /** Inner `Container` width. @default "content" */
  width?: ContainerWidth;
  /** Additional classes merged after the rhythm classes. */
  className?: string;
  children?: ReactNode;
}

/**
 * Top-level page landmark. Renders a `<section>` with responsive vertical
 * rhythm from the `--section-y-*` tokens (96 / 120 / 160px across mobile /
 * tablet / desktop) and an inner `Container`.
 *
 * Borders and dividers are intentionally opt-in via `className` so the
 * primitive stays reusable; the frozen wireframe adds `border-b border-line`
 * per section.
 */
export function Section({
  id,
  labelledById,
  width = "content",
  className,
  children,
}: SectionProps) {
  const derivedLabelledBy = id ? `${id}-heading` : undefined;
  const classes = [
    "py-[length:var(--section-y-mobile)]",
    "md:py-[length:var(--section-y-tablet)]",
    "lg:py-[length:var(--section-y-desktop)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section
      id={id}
      aria-labelledby={labelledById ?? derivedLabelledBy}
      className={classes}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
