"use client";

import {
  createContext,
  useContext,
} from "react";

export interface IntroContextValue {
  /**
   * Flipped to `true` the instant "Kishen" begins its translate toward the
   * hero position. Hero supporting copy (`FadeUp` blocks under the name)
   * reads this so their reveal cascades in sync with the move rather than
   * firing on mount, well before the loader finishes. Stays `false` during
   * the initial ~2.5s hold and on reduced-motion / no-js paths.
   */
  active: boolean;
}

export const IntroContext = createContext<IntroContextValue>({
  active: false,
});

export function useIntroReady(): boolean {
  return useContext(IntroContext).active;
}