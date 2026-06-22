import type { ProjectMetric } from "@/lib/types";
import { Eyebrow } from "@/components/typography";

/**
 * MetricRow — a 2-up (mobile) / 4-up (desktop) grid of project metrics.
 * Mirrors the frozen wireframe: mono eyebrow label above a display-font
 * value. Values are real text, never count-up or animation-dependent
 * (per DESIGN.md Forbidden Motion + AI-portfolio prevention rules).
 *
 * Spacing above the grid is owned by the consumer so the primitive stays
 * layout-agnostic.
 */
export interface MetricRowProps {
  metrics: ProjectMetric[];
  className?: string;
}

export function MetricRow({ metrics, className }: MetricRowProps) {
  const classes = [
    "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <Eyebrow as="div">{metric.label}</Eyebrow>
          <div className="mt-1 font-display leading-tight text-large-body text-ink">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
