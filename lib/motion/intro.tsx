"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotionContext } from "./reduced-motion-gate";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";

interface IntroContextValue {
  done: boolean;
  setDone: (v: boolean) => void;
}

const IntroContext = createContext<IntroContextValue>({
  done: true,
  setDone: () => {},
});

export function useIntroDone(): boolean {
  return useContext(IntroContext).done;
}

export interface IntroProviderProps {
  children: ReactNode;
}

/**
 * `IntroProvider` — broadcasts the intro-loader handshake to the Hero. The
 * loader starts with `done = false`; the Hero hides its name + gates its
 * supporting copy on this flag. When the loader's centered name finishes
 * flying to the hero position, it flips `done = true` so the Hero name is
 * revealed (seamless handoff — the flying clone lands exactly on the h1)
 * and the role / tagline / scroll-cue cascade begins.
 *
 * Default context value is `{ done: true }` so any consumer mounted outside
 * the provider (edge case) renders content immediately — progressive
 * enhancement, never motion-locked.
 */
export function IntroProvider({ children }: IntroProviderProps) {
  const [done, setDone] = useState(false);
  return (
    <IntroContext.Provider value={{ done, setDone }}>
      {children}
    </IntroContext.Provider>
  );
}

export interface IntroLoaderProps {
  name: string;
}

/**
 * `IntroLoader` — the site intro. Renders a full-screen overlay with the
 * name centered in hero typography, holds briefly, then flies the name to
 * the Hero's `<h1 id="hero-name">` position via a single composited
 * `transform: translate()` (measured with `getBoundingClientRect` on both
 * the clone and the target). Because the clone's font-size, width, and
 * line-height are pinned to the target's computed values up front, the
 * flight is a pure translate — no scale, no layout shift — and the landing
 * is seamless: on arrival the overlay fades out while the real h1 (already
 * sitting at that exact rect) is revealed underneath.
 *
 * **Reduced motion / no-JS:** When `prefers-reduced-motion` is on, the
 * loader skips entirely — `done` flips to `true` immediately and the Hero
 * renders static. SSR emits the overlay (so first paint is the intro, not
 * the hero) but the mounted guard + reduced-motion check remove it before
 * any animation runs for reduced-motion users.
 *
 * Uses `transform`/`opacity` only (DESIGN.md motion rules; PLAN.md hard
 * rules: zero CLS). Max 1–2 active animations per viewport — the fly is the
 * single showcase animation; the overlay fade overlaps it only briefly at
 * handoff.
 */
export function IntroLoader({ name }: IntroLoaderProps) {
  const reduced = useReducedMotionContext();
  const { setDone } = useContext(IntroContext);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<"hold" | "fly" | "fade" | "hidden">(
    "hold",
  );

  useIsoLayoutEffect(() => {
    if (reduced) {
      setDone(true);
      setPhase("hidden");
    }
  }, [reduced, setDone]);

  useEffect(() => {
    if (reduced) return;
    const target = document.getElementById("hero-name");
    const nameEl = nameRef.current;
    if (!target || !nameEl) {
      setDone(true);
      setPhase("hidden");
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const cs = getComputedStyle(target);
    nameEl.style.fontSize = cs.fontSize;
    nameEl.style.width = `${targetRect.width}px`;

    const t = window.setTimeout(() => {
      const startRect = nameEl.getBoundingClientRect();
      const dx = targetRect.left - startRect.left;
      const dy = targetRect.top - startRect.top;
      nameEl.style.transition =
        "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      nameEl.style.transform = `translate(${dx}px, ${dy}px)`;
      setPhase("fly");
    }, 700);

    return () => window.clearTimeout(t);
  }, [reduced, setDone]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === nameRef.current && e.propertyName === "transform") {
      setDone(true);
      setPhase("fade");
    } else if (
      e.target === overlayRef.current &&
      e.propertyName === "opacity"
    ) {
      setPhase("hidden");
    }
  };

  if (phase === "hidden") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
      style={{
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <h1
        ref={nameRef}
        className="font-display font-bold tracking-tight text-hero text-ink text-left"
      >
        {name}
      </h1>
    </div>
  );
}
