import { SiteNav } from "@/components/nav/site-nav";
import { getNav, getPersonal } from "@/lib/data";

export default function Page() {
  const nav = getNav();
  const personal = getPersonal();
  return (
    <>
      <SiteNav items={nav} name={personal.name} />
      <main id="main" className="min-h-screen" />
    </>
  );
}
