"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IntroContext } from "@/lib/motion/intro-context";

/**
 * IntroLoader — full-screen name reveal. On initial load, "Kishen" appears
 * centered in Fraunces over an opaque background. After ~2.5s the background
 * is rigid-cut away (no fade) so the hero section becomes visible beneath,
 * and at that same instant the centered "Kishen" begins its translate toward
 * its natural hero position while the hero's supporting copy cascades in via
 * the same `FadeUp` reveal every other section uses — synced to the move.
 *
 * The real hero name (`#hero-name`) is held at opacity 0 during the hold and
 * the move so only the overlay copy is seen mid-flight; at move end the
 * overlay text is hard-cut and the real name swaps in at the same spot
 * (same font / size / leading) — a seamless, rigid handoff, no cross-fade.
 *
 * Reduced-motion / no-JS → no animation, page renders immediately, `active`
 * stays `true` so hero copy is visible from the start.
 */
export function IntroLoader({ children }: { children: React.ReactNode }) {
  const overlayBgRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setActive(true);
      overlayBgRef.current?.remove();
      overlayTextRef.current?.remove();
      return;
    }

    document.body.style.overflow = "hidden";

    const heroName = document.getElementById("hero-name");
    if (
      !heroName ||
      !overlayBgRef.current ||
      !overlayTextRef.current ||
      !nameRef.current
    ) {
      document.body.style.overflow = "";
      setActive(true);
      overlayBgRef.current?.remove();
      overlayTextRef.current?.remove();
      return;
    }

    // Keep the real hero name invisible during hold + move; swapped in at end.
    const prevOpacity = heroName.style.opacity;
    heroName.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetRect = heroName.getBoundingClientRect();
        const nameRect = nameRef.current!.getBoundingClientRect();
        const x = targetRect.left - nameRect.left;
        const y = targetRect.top - nameRect.top;

        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            heroName.style.opacity = prevOpacity;
            overlayBgRef.current?.remove();
            overlayTextRef.current?.remove();
          },
        });

        // Hold the centered name for ~2.5s.
        // Then: rigid-cut the bg, release hero copy (active=true), and start
        // the name translate toward its hero position.
        tl.call(() => setActive(true), [], "+=2.5")
          .set(overlayBgRef.current, { autoAlpha: 0 })
          .to(
            nameRef.current,
            { x, y, duration: 1, ease: "power3.inOut" },
          )
          // Hard swap: overlay text out, real hero name takes over.
          .set(overlayTextRef.current, { autoAlpha: 0 });
      });
    });
  }, []);

  return (
    <IntroContext.Provider value={{ active }}>
      <div ref={overlayBgRef} className="fixed inset-0 z-50 bg-bg" />
      <div
        ref={overlayTextRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
      >
        <h1
          ref={nameRef}
          className="origin-top-left font-display font-bold text-hero tracking-tight leading-[0.95] text-ink whitespace-nowrap"
        >
          Kishen
        </h1>
      </div>
      {children}
    </IntroContext.Provider>
  );
}