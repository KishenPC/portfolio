"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionContext } from "@/lib/motion/reduced-motion-gate";

/**
 * ScrollSnapController — gentle section-boundary scroll snapping.
 *
 * Detects when the user stops scrolling and, if they're within a threshold
 * of a section's top edge, smoothly scrolls to align that section's header
 * just below the fixed nav. Only fires on scroll *end* (debounced), never
 * during active scrolling — so it never fights normal scroll or the GSAP
 * pinned narrative. This is the "Harry Nguyen" feel: sections click into
 * place only when you're already close to a boundary.
 *
 **How it works:**
 * 1. On mount, queries all `[data-snap-section]` elements.
 * 2. Listens to `scroll` events (passive), debounced by 120ms — the snap
 *    only fires after the user stops scrolling.
 * 3. Finds the nearest section top within `THRESHOLD` (180px) of the
 *    current scroll position (offset by the 64px nav).
 * 4. If found, `window.scrollTo({ top, behavior: 'smooth' })` — a single
 *    smooth animation, no loop, no fighting.
 * 5. If the user scrolls again during the smooth animation, the debounce
 *    resets and no new snap fires — the user always wins.
 *
 **Reduced motion:** No snapping at all — `scroll-behavior: auto` is already
 * set in globals.css for reduced-motion users, and this controller no-ops.
 *
 **GSAP safety:** The Work section's pinned narrative changes scroll flow
 * via `position: fixed`. This controller only reads `getBoundingClientRect`
 * at scroll-end, so it never conflicts with active pinning. Sections tagged
 * with `data-snap-section` are the only snap targets — the pinned narrative
 * inside them scrolls naturally.
 */
const THRESHOLD = 180;
const NAV_OFFSET = 64;
const DEBOUNCE_MS = 120;

export function ScrollSnapController() {
  const reduced = useReducedMotionContext();
  const scrollTimer = useRef<number | undefined>(undefined);
  const isSnapping = useRef(false);

  useEffect(() => {
    if (reduced) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-snap-section]"),
    );
    if (sections.length === 0) return;

    const onScroll = () => {
      if (isSnapping.current) {
        isSnapping.current = false;
        return;
      }
      if (scrollTimer.current !== undefined) {
        window.clearTimeout(scrollTimer.current);
      }
      scrollTimer.current = window.setTimeout(() => {
        const scrollY = window.scrollY;
        let nearest: HTMLElement | null = null;
        let nearestDist = Infinity;

        for (const section of sections) {
          const top = section.offsetTop - NAV_OFFSET;
          const dist = Math.abs(scrollY - top);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = section;
          }
        }

        if (nearest && nearestDist <= THRESHOLD) {
          const targetTop = nearest.offsetTop - NAV_OFFSET;
          if (Math.abs(scrollY - targetTop) > 4) {
            isSnapping.current = true;
            window.scrollTo({ top: targetTop, behavior: "smooth" });
          }
        }
      }, DEBOUNCE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current !== undefined) {
        window.clearTimeout(scrollTimer.current);
      }
    };
  }, [reduced]);

  return null;
}
