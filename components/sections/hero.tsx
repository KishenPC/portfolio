import { Container } from "@/components/layout";
import { Heading, Body, Mono } from "@/components/typography";
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
 */
export function Hero() {
  const personal = getPersonal();
  return (
    <section className="flex min-h-screen items-center border-b border-line pt-16">
      <Container width="content" className="w-full">
        <Heading as="h1" scale="hero">
          {personal.name}
        </Heading>
        <p className="mt-8 text-ink-2 text-hero-subtitle">{personal.role}</p>
        <Body scale="large" className="mt-4 max-w-reading text-ink-2">
          {personal.tagline}
        </Body>
        <Mono as="div" className="mt-16">
          scroll ↓
        </Mono>
      </Container>
    </section>
  );
}
