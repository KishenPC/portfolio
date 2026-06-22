"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export interface ReducedMotionContextValue {
  /** True when the user has `prefers-reduced-motion: reduce` enabled. */
  reduced: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  reduced: false,
});

export interface ReducedMotionGateProps {
  children: ReactNode;
}

/**
 * `ReducedMotionGate` — a context provider that mounts a single
 * `matchMedia('(prefers-reduced-motion: reduce)')` listener at the app root
 * and broadcasts the result to every motion primitive below.
 *
 * Without this gate, each `FadeUp` / `RevealText` / `ScrollPin` /
 * `MagneticLink` would create its own listener — fine for a handful but
 * wasteful across 20+ instances. Wrap the app in `app/layout.tsx` so the
 * entire tree reads from one source of truth via `useReducedMotionContext`.
 *
 * The default context value is `{ reduced: false }` so server-side renders
 * and any consumer mounted outside the gate (edge case) render content
 * visibly — progressive enhancement, never motion-locked.
 */
export function ReducedMotionGate({ children }: ReducedMotionGateProps) {
  const reduced = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={{ reduced }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

/**
 * Read the reduced-motion flag from the nearest `ReducedMotionGate`. Every
 * motion primitive uses this instead of calling `useReducedMotion` directly
 * so there is a single `matchMedia` listener for the whole app.
 */
export function useReducedMotionContext(): boolean {
  return useContext(ReducedMotionContext).reduced;
}
