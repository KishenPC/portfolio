import type { ExperienceEntry } from "@/lib/types";

/**
 * Real experience data from `.docs/PERSONAL_INFO.md`.
 * Single entry (ACM Student Chapter — VIT, Senior Core Committee Member).
 * Returned as an array so the contract scales to future roles without
 * changing the accessor signature.
 *
 * `period` and `summary` are not documented in PERSONAL_INFO.md — they remain
 * as placeholders until the user provides them.
 */
export const experience: ExperienceEntry[] = [
  {
    role: "Senior Core Committee Member",
    org: "ACM Student Chapter — VIT",
    period: "[Period]",
    summary:
      "[Short editorial entry describing the role and craft beyond project artifacts.]",
    highlights: [
      "Cryptic Hunt technical infrastructure",
      "Code2Create review panel",
      "Reverse Coding technical setup",
      "Mentored junior developers",
    ],
  },
];
