import { Fragment } from "react";
import { SiteNav } from "@/components/nav/site-nav";
import { IntroLoader } from "@/components/intro/intro-loader";
import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { Experience } from "@/components/sections/experience";
import { SkillStack } from "@/components/sections/skill-stack";
import { Certifications } from "@/components/sections/certifications";
import { Connect } from "@/components/sections/connect";
import { SelectedWork } from "@/components/work";
import { getNav, getPersonal } from "@/lib/data";

export default function Page() {
  const nav = getNav();
  const personal = getPersonal();
  return (
    <IntroLoader>
      <Fragment>
        <SiteNav items={nav} name={personal.name} />
        <main id="main">
          <Hero />
          <Introduction />
          <SelectedWork />
          <Experience />
          <SkillStack />
          <Certifications />
          <Connect />
        </main>
      </Fragment>
    </IntroLoader>
  );
}
