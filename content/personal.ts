import type { PersonalInfo } from "@/lib/types";

/**
 * Placeholder personal data mirroring the frozen wireframe.
 * Real content swap is a data-only operation (TASKS.md Task 21).
 *
 * Email resolves from `NEXT_PUBLIC_CONTACT_EMAIL` env var with the wireframe's
 * placeholder fallback. `NEXT_PUBLIC_*` is inlined by Next.js at build time,
 * so it works in both server and client contexts.
 */
export const personal: PersonalInfo = {
  name: "[Full Name]",
  role: "[Role Title]",
  location: "[Location]",
  github: "#",
  linkedin: "#",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  tagline:
    "[One-line positioning statement goes here describing curiosity, product thinking, and building experiences people enjoy using.]",
  intro: [
    "[Short editorial paragraph describing how this person thinks about building products, exploring systems, and creating experiences people enjoy using.]",
    "[Second paragraph expanding on learning through building and the breadth of work spanning web, mobile, developer tools, recommendation systems, and interactive visualizations.]",
    "[Third paragraph reinforcing curiosity and a growth mindset through hands-on construction.]",
  ],
  education: {
    degree: "B.Tech",
    field: "Computer Science and Engineering",
    status: "Pre-final Year",
  },
};
