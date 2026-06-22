/**
 * Portfolio data architecture contracts.
 *
 * Source: `.docs/PLAN.md` Data Architecture. Types are architecture contracts,
 * not implementation — components import from `lib/data.ts`, never directly
 * from `content/`.
 */

// ─── Personal ───────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  github: string;
  linkedin: string;
  email: string; // resolved from env, placeholder fallback
  tagline: string; // hero one-liner
  intro: string[]; // introduction paragraphs
  education: { degree: string; field: string; status: string };
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
}

// ─── Projects ───────────────────────────────────────────────────────────────

export type ProjectMode = "featured" | "editorial";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  blur?: string;
  aspect?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "live" | "case-study";
}

export interface NarrativeBlock {
  intent: "context" | "approach" | "outcome";
  heading: string;
  body: string; // markdown/MDX
  image?: ProjectImage;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  keywords: string[]; // keyword cluster
  mode: ProjectMode;
  summary: string;
  year?: string;
  status?: string;
  role?: string;
  screenshots: ProjectImage[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
  narrative?: NarrativeBlock[]; // required when mode === "featured"
  detail?: { mdx: string }; // expandable in-page detail
}

// ─── Experience ─────────────────────────────────────────────────────────────
// Not in PLAN.md Data Architecture but implied by Section 4 + getExperience().

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
}

// ─── Stack ──────────────────────────────────────────────────────────────────

export interface StackItem {
  name: string;
  logo: string; // asset path; empty string → placeholder
}

export interface StackGroup {
  name: string;
  items: StackItem[];
}

// ─── Certifications ─────────────────────────────────────────────────────────

export interface Certification {
  name: string;
  issuer: string;
  date: string; // "MM YYYY" or "In Progress"
  status: "completed" | "in-progress";
  credentialUrl?: string;
}
