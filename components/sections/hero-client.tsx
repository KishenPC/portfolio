"use client";

import { Container } from "@/components/layout";
import { Heading, Body, Mono } from "@/components/typography";
import { FadeUp } from "@/components/motion";
import type { PersonalInfo } from "@/lib/types";

export interface HeroClientProps {
  personal: PersonalInfo;
}

/**
 * `HeroClient` — the interactive half of the Hero. The name renders
 * statically and immediately (no intro loader, no hide/show handshake).
 * The role / tagline / scroll-cue `FadeUp` blocks reveal on enter.
 *
 * Receives `personal` as a prop from the server `Hero` shell so the content
 * module stays out of the client bundle (see SiteNav's data-passing note).
 */
export function HeroClient({ personal }: HeroClientProps) {
  return (
    <section className="flex min-h-screen items-center overflow-x-hidden border-b border-line pt-16">
      <Container width="content" className="w-full">
        <Heading as="h1" id="hero-name" scale="hero">
          {personal.name}
        </Heading>
        <FadeUp delay={0.3} className="mt-8">
          <p className="text-ink-2 text-hero-subtitle">{personal.role}</p>
        </FadeUp>
        <FadeUp delay={0.45} className="mt-4">
          <Body scale="large" className="max-w-reading text-ink-2">
            {personal.tagline}
          </Body>
        </FadeUp>
        <FadeUp delay={0.6} className="mt-16">
          <Mono as="div">scroll ↓</Mono>
        </FadeUp>
      </Container>
    </section>
  );
}
