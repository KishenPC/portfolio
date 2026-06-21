import type { ExperienceEntry } from "@/lib/types";

/**
 * Placeholder experience entry mirroring the frozen wireframe Experience section.
 * Single entry (ACM Student Chapter — VIT, Senior Core Committee) per PLAN.md
 * Section 4. Returned as an array so the contract scales to future roles
 * without changing the accessor signature.
 */
export const experience: ExperienceEntry[] = [
  {
    role: "[Role]",
    org: "[Organization]",
    period: "[Period]",
    summary:
      "[Short editorial entry describing the role and craft beyond project artifacts.]",
    highlights: [
      "[Highlight one: technical event infrastructure]",
      "[Highlight two: mentorship of junior developers]",
      "[Highlight three: event operations and technical reviews]",
      "[Highlight four: community initiatives]",
    ],
  },
];
