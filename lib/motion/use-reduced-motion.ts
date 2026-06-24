"use client";

import { useEffect, useState } from "react";

/**
 * `useReducedMotion` — SSR-safe hook that reflects the user's
 * `prefers-reduced-motion` OS setting.
 *
 * Returns `false` on the server and during the first client render (so the
 * initial paint always shows content — progressive enhancement), then
 * updates to the real `matchMedia` value after mount. Listens for changes so
 * toggling the OS setting live-updates the UI without a reload.
 *
 * Per DESIGN.md Accessibility Rules + PLAN.md Motion Architecture: every
 * animation primitive consults this hook (directly or via the
 * `ReducedMotionGate` context) and short-circuits to a static render when
 * the user has reduced motion enabled. No motion-locked content, no loss of
 * information.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
