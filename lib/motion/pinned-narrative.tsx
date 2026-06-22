"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotionContext } from "./reduced-motion-gate";

export interface PinnedNarrativeProps {
  /** The screenshot/content to pin on the left (desktop). On mobile this
   * renders above the narrative in normal flow. */
  screenshot: ReactNode;
  /** The narrative blocks (Context / Approach / Outcome) that scroll past
   * the pinned screenshot on desktop. On mobile this renders below the
   * screenshot in normal flow. */
  narrative: ReactNode;
}

/**
 * `PinnedNarrative` — the Work section's pinned scroll storytelling layout.
 *
 * **Desktop (lg+, no reduced motion):** Renders a 12-column grid — the
 * screenshot in `col-span-5` is pinned via GSAP ScrollTrigger while the
 * narrative in `col-span-7` scrolls past it. The screenshot stays fixed in
 * the viewport (alongside the narrative) and releases when the narrative
 * column has been fully scrolled. This is the "pinned scroll progression"
 * from PLAN.md's Work (Featured) motion map.
 *
 * **Mobile / tablet (below lg) OR reduced motion:** The grid collapses to a
 * single column — screenshot above narrative, both in normal scroll flow.
 * No pinning, no transforms. All content is fully accessible by normal
 * scroll. This satisfies "Mobile: featured → static stacked narrative blocks,
 * all content present" (TASKS.md Task 20).
 *
 * **GSAP is dynamically imported** inside `useEffect` (`await import("gsap")`)
 * so it is code-split into a separate chunk that loads on the client only
 * after hydration. GSAP never enters the initial JS bundle — the homepage's
 * First Load JS stays lean (PLAN.md: "GSAP code-split to Work only"). The
 * JSX (the two-column grid) is server-rendered and visible immediately; the
 * pinning effect is a progressive enhancement that activates when GSAP loads.
 *
 * **Keyboard scroll safety:** GSAP pins with `pinSpacing: false`, which uses
 * `position: fixed` on the pinned element without adding scroll-trapping
 * padding. The page scrolls normally — keyboard, mouse, and touch all work
 * through the pinned section. The pinned screenshot is a visual effect only;
 * it does not affect scroll behaviour (TASKS.md: "Keyboard scroll not trapped
 * by pinning").
 *
 * **Cleanup:** `gsap.context` + `ctx.revert()` on unmount kills the
 * ScrollTrigger, clears inline styles (position/width/height), and removes
 * the trigger from GSAP's registry. A `cancelled` flag prevents the async
 * import callback from running if the component unmounts before GSAP loads.
 */
export function PinnedNarrative({ screenshot, narrative }: PinnedNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionContext();

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const screenshotEl = screenshotRef.current;
    if (!container || !screenshotEl) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !container || !screenshotEl) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: container,
            start: "top 96px",
            end: "bottom bottom",
            pin: screenshotEl,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        });
        return () => mm.revert();
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="mt-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start"
    >
      <div ref={screenshotRef} className="lg:col-span-5">
        {screenshot}
      </div>
      <div className="mt-10 lg:mt-0 lg:col-span-7">{narrative}</div>
    </div>
  );
}
