import { Container } from "@/components/layout";
import { Heading, Body, Mono } from "@/components/typography";
import { FadeUp, RevealText } from "@/components/motion";
import { getPersonal } from "@/lib/data";

/**
 * Hero — identity in three seconds. Full-viewport, left-aligned, single
 * focal point: the name. No decorative effects, no animated background.
 *
 * Hierarchy matches the approved wireframe: name → role → tagline → scroll
 * cue. Content comes from `personal.ts` via the typed data layer. The name
 * uses the Hero Name fluid token (96–160px via `clamp()`); the role uses the
 * Hero Subtitle token (28–40px); the tagline is Large Body constrained to
 * reading width. `pt-16` offsets the fixed header so content never hides
 * behind the nav at the top of the page.
 *
 * Motion (PLAN.md Hero spec): a one-time staggered word-mask reveal on the
 * name (the single showcase animation), followed by a calm fade-up cascade
 * on role → tagline → scroll cue. Max 1–2 active animations per viewport.
 * Reduced-motion → everything renders static (no transforms), no loss of
 * information. `transform`/`opacity` only; layout space always reserved.
 */
export function Hero() {
  const personal = getPersonal();
  return (
    <section className="flex min-h-screen items-center border-b border-line pt-16">
      <Container width="content" className="w-full">
        <Heading as="h1" scale="hero">
          <RevealText text={personal.name} />
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
