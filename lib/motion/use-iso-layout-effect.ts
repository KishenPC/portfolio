"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useIsoLayoutEffect` — `useLayoutEffect` on the client, `useEffect` on the
 * server. Avoids the React warning when `useLayoutEffect` is encountered
 * during SSR of a client component.
 *
 * Used by motion primitives to set the "mounted" flag synchronously before
 * the browser paints (on the client), so the initial hidden state is applied
 * without a flash of visible content. On the server it falls back to
 * `useEffect` (no-op) so server HTML renders content visibly.
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
