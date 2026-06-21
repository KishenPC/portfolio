"use client";

import { useEffect, useState } from "react";

/**
 * A 1px accent hairline pinned to the very top of the viewport that grows from
 * left to right with scroll progress. Purely decorative — `aria-hidden` and
 * `pointer-events-none` so it never interferes with content or assistive tech.
 *
 * Updates are throttled with `requestAnimationFrame` and read from
 * `transform: scaleX()` (GPU-friendly, no layout work).
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-accent/40"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
