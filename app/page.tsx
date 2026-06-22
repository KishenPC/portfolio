import { SiteNav } from "@/components/nav/site-nav";
import { ScrollSnapController } from "@/components/nav/scroll-snap-controller";
import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { Experience } from "@/components/sections/experience";
import { SkillStack } from "@/components/sections/skill-stack";
import { Certifications } from "@/components/sections/certifications";
import { Connect } from "@/components/sections/connect";
import { SelectedWork } from "@/components/work";
import { IntroProvider, IntroLoader } from "@/components/motion";
import { getNav, getPersonal } from "@/lib/data";

export default function Page() {
  const nav = getNav();
  const personal = getPersonal();
  return (
    <IntroProvider>
      <IntroLoader name={personal.name} />
      <SiteNav items={nav} name={personal.name} />
      <ScrollSnapController />
      <main id="main">
        <Hero />
        <Introduction />
        <SelectedWork />
        <Experience />
        <SkillStack />
        <Certifications />
        <Connect />
      </main>
    </IntroProvider>
  );
}
