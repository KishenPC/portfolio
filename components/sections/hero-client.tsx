"use client";

import { Container } from "@/components/layout";
import { Heading, Body, Mono } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import { useIntroReady } from "@/lib/motion/intro-context";
import type { PersonalInfo } from "@/lib/types";

export interface HeroClientProps {
  personal: PersonalInfo;
}

/**
 * `HeroClient` — the interactive half of the Hero. The name renders
 * statically and immediately (the intro overlay sits on top of it; when
 * the loader cuts away the name is already in place). The role / tagline /
 * scroll-cue `FadeUp` blocks stay gated on `IntroContext.active` until the
 * loader releases them — the moment "Kishen" begins moving — so they then
 * cascade in via the same `FadeUp` reveal used by every other section,
 * synced to the move rather than firing on mount.
 *
 * Receives `personal` as a prop from the server `Hero` shell so the content
 * module stays out of the client bundle (see SiteNav's data-passing note).
 */
export function HeroClient({ personal }: HeroClientProps) {
  const introActive = useIntroReady();
  return (
    <section className="flex min-h-screen items-center overflow-x-hidden border-b border-line pt-16">
      <Container width="content" className="w-full">
        <Heading as="h1" id="hero-name" scale="hero">
          {personal.name}
        </Heading>
        <FadeUp active={introActive} delay={0.05} className="mt-8">
          <p className="text-ink-2 text-hero-subtitle">{personal.role}</p>
        </FadeUp>
        <FadeUp active={introActive} delay={0.2} className="mt-4">
          <Body scale="large" className="max-w-reading text-ink-2">
            {personal.tagline}
          </Body>
        </FadeUp>
        <FadeUp active={introActive} delay={0.35} className="mt-16">
          <Mono as="div">scroll ↓</Mono>
        </FadeUp>
      </Container>
    </section>
  );
}
