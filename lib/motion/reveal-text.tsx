"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotionContext } from "./reduced-motion-gate";

export interface RevealTextProps {
  text: string;
  className?: string;
  /** Delay between each word's reveal, in seconds. @default 0.08 */
  stagger?: number;
}

/**
 * `RevealText` — a word-by-word mask reveal for headings. Each word is
 * wrapped in an `overflow-hidden` mask and translates up from below on
 * enter, creating the editorial text-reveal effect from PLAN.md's Hero
 * motion spec ("one-time staggered heading reveal — word/line mask").
 *
 * **Reduced motion / no-JS:** When `prefers-reduced-motion` is on, or before
 * hydration completes, the text renders as plain inline text with no
 * transforms — fully visible, fully accessible. The `mounted` guard ensures
 * the server render (and any no-JS scenario) shows content immediately
 * (progressive enhancement). After mount, if motion is allowed, the word
 * spans get `translateY(110%)` → `translateY(0)` with a per-word stagger
 * driven by Motion's `useInView` (once, no re-trigger).
 *
 * Uses `transform` only (no opacity) so text is always in the DOM and
 * readable by screen readers regardless of animation state. The `pb/-mb`
 * trick on the mask prevents descender clipping (g, y, p, j).
 *
 * Place inside any heading element: `<h1><RevealText text={name} /></h1>`.
 */
export function RevealText({
  text,
  className,
  stagger = 0.08,
}: RevealTextProps) {
  const reduced = useReducedMotionContext();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const words = text.split(" ");
  const shouldAnimate = mounted && !reduced;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em]"
        >
          <span
            className="inline-block will-change-transform"
            style={
              shouldAnimate
                ? {
                    transform: inView ? "translateY(0)" : "translateY(110%)",
                    transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * stagger}s`,
                  }
                : undefined
            }
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
