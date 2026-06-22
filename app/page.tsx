import { SiteNav } from "@/components/nav/site-nav";
import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { Experience } from "@/components/sections/experience";
import { SkillStack } from "@/components/sections/skill-stack";
import { Awards } from "@/components/sections/awards";
import { Certifications } from "@/components/sections/certifications";
import { SelectedWork } from "@/components/work";
import { getNav, getPersonal } from "@/lib/data";

export default function Page() {
  const nav = getNav();
  const personal = getPersonal();
  return (
    <>
      <SiteNav items={nav} name={personal.name} />
      <main id="main">
        <Hero />
        <Introduction />
        <SelectedWork />
        <Experience />
        <SkillStack />
        <Awards />
        <Certifications />
      </main>
    </>
  );
}
