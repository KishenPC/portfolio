import type { Certification } from "@/lib/types";

/**
 * Real certifications data from `.docs/PERSONAL_INFO.md`.
 *
 * 2 entries:
 * - Machine Learning Specialization — currently pursuing (in-progress).
 * - Oracle Generative AI Professional Certification — completed (issuer
 *   inferred from the certification name; no credential URL or date
 *   documented, so those fields use placeholders).
 *
 * `credentialUrl` is omitted for both — no credential URLs are documented in
 * PERSONAL_INFO.md. The consuming component renders the "View Credential"
 * link only when `credentialUrl` is present and `status === "completed"`.
 */
export const certifications: Certification[] = [
  {
    name: "Machine Learning Specialization",
    issuer: "[Issuer]",
    date: "In Progress",
    status: "in-progress",
  },
  {
    name: "Oracle Generative AI Professional Certification",
    issuer: "Oracle",
    date: "[Completed: MM YYYY]",
    status: "completed",
  },
];
