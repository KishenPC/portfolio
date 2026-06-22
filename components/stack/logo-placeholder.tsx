import Image from "next/image";
import type { StackItem } from "@/lib/types";

export interface LogoPlaceholderProps {
  item: StackItem;
  className?: string;
}

/**
 * LogoPlaceholder — a stack technology logo with a graceful placeholder state.
 *
 * When `item.logo` is empty (placeholder data, pre-real-logos), renders a
 * `role="img"` box with the item's name as both the visible mono label and
 * the accessible name (via `aria-label`). When `logo` is present, renders
 * `next/image` (`fill`, `object-contain`) with the item name as alt text so
 * the accessible name is preserved across the placeholder→real swap.
 *
 * Mirrors the frozen wireframe's placeholder box
 * (`w-24 h-16 md:w-28 md:h-20`, hairline border, surface fill, mono caption).
 * No bars, ratings, or percentages — per DESIGN.md AI-portfolio prevention
 * rules. Dimensions are fixed at the primitive level so the wrapping grid
 * stays evenly aligned.
 */
export function LogoPlaceholder({ item, className }: LogoPlaceholderProps) {
  const frame = [
    "relative w-24 h-16 md:w-28 md:h-20 border border-line bg-surface",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!item.logo) {
    return (
      <div
        role="img"
        aria-label={item.name}
        className={[
          "flex items-center justify-center px-1 text-center",
          frame,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="font-mono text-[10px] text-ink-3">{item.name}</span>
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={item.logo}
        alt={item.name}
        fill
        className="object-contain p-2"
        sizes="112px"
      />
    </div>
  );
}
