"use client";

import { useState, type CSSProperties } from "react";
import { Container } from "@/components/layout";
import { Heading, Body, Mono } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import { useReducedMotionContext } from "@/lib/motion/reduced-motion-gate";
import { useIsoLayoutEffect } from "@/lib/motion/use-iso-layout-effect";
import { useIntroDone } from "@/lib/motion/intro";
import type { PersonalInfo } from "@/lib/types";

export interface HeroClientProps {
  personal: PersonalInfo;
}

/**
 * `HeroClient` — the interactive half of the Hero. Coordinates with
 * `IntroLoader` via the `useIntroDone` handshake:
 *
 * - While the loader's centered name is flying to the hero position, the
 *   real `<h1 id="hero-name">` is kept at `opacity: 0` (layout preserved —
 *   the loader measures its rect) so there is no double image. The name's
 *   entrance IS the loader flight; no separate word-mask reveal here.
 * - On `done`, the h1 snaps visible exactly as the flying clone lands on
 *   it (seamless handoff) and the role / tagline / scroll-cue `FadeUp`
 *   blocks release (`active={done}`) for a calm cascade.
 *
 * `hideName` is gated on `mounted && !reduced && !done` so SSR, no-JS, and
 *   reduced-motion users see the name immediately (progressive enhancement,
 *   never motion-locked) — matching the codebase motion-primitive pattern.
 *
 * Receives `personal` as a prop from the server `Hero` shell so the content
 * module stays out of the client bundle (see SiteNav's data-passing note).
 */
export function HeroClient({ personal }: HeroClientProps) {
  const reduced = useReducedMotionContext();
  const done = useIntroDone();
  const [mounted, setMounted] = useState(false);
  useIsoLayoutEffect(() => setMounted(true), []);

  const hideName = mounted && !reduced && !done;
  const nameStyle: CSSProperties | undefined = hideName
    ? { opacity: 0 }
    : undefined;

  return (
    <section className="flex min-h-screen items-center overflow-x-hidden border-b border-line pt-16">
      <Container width="content" className="w-full">
        <Heading as="h1" id="hero-name" scale="hero" style={nameStyle}>
          {personal.name}
        </Heading>
        <FadeUp delay={0.3} active={done} className="mt-8">
          <p className="text-ink-2 text-hero-subtitle">{personal.role}</p>
        </FadeUp>
        <FadeUp delay={0.45} active={done} className="mt-4">
          <Body scale="large" className="max-w-reading text-ink-2">
            {personal.tagline}
          </Body>
        </FadeUp>
        <FadeUp delay={0.6} active={done} className="mt-16">
          <Mono as="div">scroll ↓</Mono>
        </FadeUp>
      </Container>
    </section>
  );
}
