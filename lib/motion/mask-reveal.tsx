"use client";

import { useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useReducedMotionContext } from "./reduced-motion-gate";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";

export interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. @default 0 */
  delay?: number;
  /** Animation duration in seconds. @default 0.8 */
  duration?: number;
}

/**
 * `MaskReveal` — a bottom-to-top wipe reveal. Wraps content in an
 * `overflow-hidden` mask; the inner block starts at `translateY(100%)`
 * (hidden below the mask edge) and slides up to `translateY(0)` when it
 * enters the viewport. No opacity change — the content is "unmasked" rather
 * than faded, creating the editorial image-mask reveal listed in PLAN.md's
 * Work section motion map.
 *
 * **Reduced motion / no-JS:** Before hydration or when `prefers-reduced-
 * motion` is on, the content renders with no inline styles — fully visible.
 * The `useIsoLayoutEffect` guard sets `mounted` synchronously before paint
 * (on the client) so the initial hidden state is applied without a flash of
 * visible content. `transform` only; layout space always reserved (the
 * outer mask div takes the content's natural height), so CLS stays at zero.
 *
 * Works on all viewports (unlike pinning/magnetic which are desktop-only) —
 * the mask reveal is a simple CSS transition with no performance concerns on
 * mobile. Use to wrap `ProjectImage` instances in the Work section.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: MaskRevealProps) {
  const reduced = useReducedMotionContext();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [mounted, setMounted] = useState(false);

  useIsoLayoutEffect(() => setMounted(true), []);

  const shouldAnimate = mounted && !reduced;
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={className}
        style={
          shouldAnimate
            ? {
                transform: inView ? "translateY(0)" : "translateY(100%)",
                transition: `transform ${duration}s ${easing} ${delay}s`,
                willChange: "transform",
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
