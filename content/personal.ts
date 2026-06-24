import type { PersonalInfo } from "@/lib/types";

/**
 * Real personal data from `.docs/PERSONAL_INFO.md`.
 *
 * Email resolves from `NEXT_PUBLIC_CONTACT_EMAIL` env var with a placeholder
 * fallback — no public email is listed in PERSONAL_INFO.md, so the env var
 * is the intended path for wiring a real address without committing it.
 * `NEXT_PUBLIC_*` is inlined by Next.js at build time, so it works in both
 * server and client contexts.
 *
 * The tagline is the opening positioning statement from PERSONAL_INFO.md's
 * Short Introduction; the `intro` array carries both full paragraphs for the
 * Introduction section so the hero hooks and the intro elaborates.
 */
export const personal: PersonalInfo = {
  name: "Kishen",
  role: "Full Stack Development",
  location: "India",
  github: "https://github.com/KishenPC",
  linkedin: "https://www.linkedin.com/in/kishen-pc-a68b41320/",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  tagline:
    "",
  intro: [
    "I am a Computer Science undergraduate interested in building products, exploring systems, and creating experiences people enjoy using.",
    "I enjoy learning through building and have worked on projects spanning web development, mobile applications, developer-focused tools, recommendation systems, and interactive visualizations.",
  ],
  education: {
    degree: "B.Tech",
    field: "Computer Science and Engineering",
    status: "Pre-final year [ 9.34 CGPA ]",
  },
};
