"use client";

import { useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useReducedMotionContext } from "./reduced-motion-gate";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";

export interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in seconds. @default 0 */
  delay?: number;
  /** Vertical travel distance in rem. @default 1.25 (20px) */
  distance?: number;
  /** Animation duration in seconds. @default 0.6 */
  duration?: number;
  /**
   * Gate the reveal on an external signal. While `false`, the block stays
   * hidden (opacity 0, translated down) even if already in view; flipping
   * to `true` releases the transition. Used by the Hero to defer its
   * supporting copy until the intro-loader handshake (`done`) fires.
   * @default true
   */
  active?: boolean;
}

/**
 * `FadeUp` — the workhorse reveal: a content block fades in and translates
 * up when it enters the viewport. Used by Hero (gated on the intro-loader
 * handshake via `active`), Introduction, Experience, Skill Stack,
 * Certifications, and Connect sections (PLAN.md Motion map).
 *
 * **Reduced motion / no-JS:** Before hydration or when `prefers-reduced-
 * motion` is on, the content renders as a plain `div` with no inline styles
 * — fully visible. The `mounted` guard ensures the server render and any
 * no-JS scenario shows content immediately (progressive enhancement). After
 * mount, if motion is allowed, `opacity` + `transform: translateY()` are
 * applied via CSS transitions, driven by Motion's `useInView` (once, no
 * re-trigger).
 *
 * Uses `transform`/`opacity` only and reserves layout space (the div is
 * always rendered, only the visual state changes) so CLS stays at zero per
 * PLAN.md hard rules. The transition uses a custom cubic-bezier
 * `(0.22, 1, 0.36, 1)` — an ease-out-expo variant that feels calm and
 * confident, matching DESIGN.md's motion philosophy.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  distance = 1.25,
  duration = 0.6,
  active = true,
}: FadeUpProps) {
  const reduced = useReducedMotionContext();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [mounted, setMounted] = useState(false);

  useIsoLayoutEffect(() => setMounted(true), []);

  const shouldAnimate = mounted && !reduced;
  const show = active !== false && inView;
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={ref}
      className={className}
      style={
        shouldAnimate
          ? {
              opacity: show ? 1 : 0,
              transform: show
                ? "translateY(0)"
                : `translateY(${distance}rem)`,
              transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
              willChange: "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
