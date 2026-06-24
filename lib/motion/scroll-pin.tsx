"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionContext } from "./reduced-motion-gate";

export interface ScrollPinProps {
  children: ReactNode;
  className?: string;
  /**
   * How far the user should scroll while the element is pinned, expressed as
   * a multiple of the element's own height. e.g. `pinDuration = 2` pins the
   * element for 2× its height of scrolling before releasing. This maps to
   * GSAP's `end: "+=" height * pinDuration` convention.
   *
   * @default 1
   */
  pinDuration?: number;
}

/**
 * `ScrollPin` — pins its content in the viewport while the user scrolls
 * through a configurable distance, enabling pinned scroll storytelling for
 * the Work section's featured projects (PLAN.md Motion Architecture).
 *
 * **Desktop-only.** Uses GSAP's `matchMedia` to gate on `min-width: 1024px`
 * (the `lg` breakpoint), so pinning is disabled on tablet and mobile per
 * PLAN.md Responsive Architecture. Reduced-motion users (`prefers-reduced-
 * motion: reduce`) get a static stack — no pinning, no transforms, all
 * content accessible by normal scroll.
 *
 * **Cleanup:** `gsap.context` + `ctx.revert()` on unmount kills the
 * ScrollTrigger, clears inline styles, and removes the trigger from GSAP's
 * internal registry — preventing the stale-trigger leaks that cause
 * scroll jank on route changes.
 *
 * **Code-splitting:** This component imports `gsap` + `ScrollTrigger`
 * (~30 KB gzip). Because it is a client component only imported by the Work
 * section, Next.js code-splits it out of the initial bundle — GSAP never
 * loads on pages that don't use pinned storytelling (PLAN.md Performance
 * Requirements).
 */
export function ScrollPin({
  children,
  className,
  pinDuration = 1,
}: ScrollPinProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionContext();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${el.offsetHeight * pinDuration}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }, el);

    return () => ctx.revert();
  }, [reduced, pinDuration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
