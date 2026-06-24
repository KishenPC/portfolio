import type { Certification } from "@/lib/types";

/**
 * `credentialUrl` is omitted for both — no credential URLs are documented in
 * PERSONAL_INFO.md. The consuming component renders the "View Credential"
 * link only when `credentialUrl` is present and `status === "completed"`.
 */
export const certifications: Certification[] = [
  {
    name: "Oracle Generative AI Professional Certification",
    issuer: "Oracle",
    date: "[Completed: June 2026]",
    status: "completed",
  },
];
