import { getPersonal } from "@/lib/data";
import { HeroClient } from "./hero-client";

/**
 * Hero — identity in three seconds. Full-viewport, left-aligned, single
 * focal point: the name. No decorative effects, no animated background.
 *
 * Server shell: fetches `personal` from the typed data layer and passes it
 * to `HeroClient` so the content module stays out of the client bundle.
 *
 * Hierarchy matches the approved wireframe: name → role → tagline → scroll
 * cue. `pt-16` offsets the fixed header so content never hides behind the
 * nav at the top of the page. Reduced-motion / no-JS → static, no loss.
 */
export function Hero() {
  const personal = getPersonal();
  return <HeroClient personal={personal} />;
}
