import type { Project } from "@/lib/types";

/**
 * Placeholder projects mirroring the frozen wireframe Selected Work section.
 * 2 featured + 2 editorial; keywords match the wireframe exactly.
 *
 * `screenshots[].src` is empty for placeholders — the consuming `ProjectImage`
 * component renders a placeholder box when `src` is empty. Real screenshots
 * arrive in TASKS.md Task 22.
 */
export const projects: Project[] = [
  {
    slug: "project-1",
    mode: "featured",
    title: "[Project 1]",
    subtitle:
      "[Project subtitle describing the product in one sentence.]",
    summary:
      "[Project summary describing what was built, why, and what it demonstrates.]",
    keywords: ["Full Stack", "Product", "Open Source", "Infrastructure"],
    screenshots: [
      { src: "", alt: "Primary screenshot placeholder" },
      { src: "", alt: "Secondary screenshot placeholder" },
    ],
    metrics: [
      { label: "[Label 1]", value: "[Value]" },
      { label: "[Label 2]", value: "[Value]" },
      { label: "[Label 3]", value: "[Value]" },
      { label: "[Label 4]", value: "[Value]" },
    ],
    links: [
      { label: "GitHub", href: "#", kind: "github" },
      { label: "Live", href: "#", kind: "live" },
      { label: "Case Study", href: "#", kind: "case-study" },
    ],
    narrative: [
      {
        intent: "context",
        heading: "[Narrative heading]",
        body: "[Narrative paragraph telling the story of this phase of the project, the problem, the thinking, and the result.]",
      },
      {
        intent: "approach",
        heading: "[Narrative heading]",
        body: "[Narrative paragraph telling the story of this phase of the project, the problem, the thinking, and the result.]",
      },
      {
        intent: "outcome",
        heading: "[Narrative heading]",
        body: "[Narrative paragraph telling the story of this phase of the project, the problem, the thinking, and the result.]",
      },
    ],
    detail: { mdx: "[Expandable in-page detail — MDX content loads by slug.]" },
  },
  {
    slug: "project-2",
    mode: "featured",
    title: "[Project 2]",
    subtitle:
      "[Project subtitle describing the product in one sentence.]",
    summary:
      "[Project summary describing what was built, why, and what it demonstrates.]",
    keywords: ["Developer Experience", "Systems", "Visualization", "Learning"],
    screenshots: [
      { src: "", alt: "Primary screenshot placeholder" },
      { src: "", alt: "Secondary screenshot placeholder" },
    ],
    metrics: [
      { label: "[Label 1]", value: "[Value]" },
      { label: "[Label 2]", value: "[Value]" },
      { label: "[Label 3]", value: "[Value]" },
      { label: "[Label 4]", value: "[Value]" },
    ],
    links: [
      { label: "GitHub", href: "#", kind: "github" },
      { label: "Live", href: "#", kind: "live" },
      { label: "Case Study", href: "#", kind: "case-study" },
    ],
    narrative: [
      {
        intent: "context",
        heading: "[Narrative heading]",
        body: "[Narrative paragraph telling the story of this phase of the project, the problem, the thinking, and the result.]",
      },
      {
        intent: "approach",
        heading: "[Narrative heading]",
        body: "[Narrative paragraph telling the story of this phase of the project, the problem, the thinking, and the result.]",
      },
      {
        intent: "outcome",
        heading: "[Narrative heading]",
        body: "[Narrative paragraph telling the story of this phase of the project, the problem, the thinking, and the result.]",
      },
    ],
    detail: { mdx: "[Expandable in-page detail — MDX content loads by slug.]" },
  },
  {
    slug: "project-3",
    mode: "editorial",
    title: "[Project 3]",
    subtitle:
      "[Project subtitle describing the product in one sentence.]",
    summary:
      "[Project summary describing what was built, why, and what it demonstrates.]",
    keywords: ["React", "TypeScript", "PostgreSQL", "Mobile"],
    screenshots: [{ src: "", alt: "Primary screenshot placeholder" }],
    metrics: [
      { label: "[Label 1]", value: "[Value]" },
      { label: "[Label 2]", value: "[Value]" },
      { label: "[Label 3]", value: "[Value]" },
      { label: "[Label 4]", value: "[Value]" },
    ],
    links: [
      { label: "GitHub", href: "#", kind: "github" },
      { label: "Live", href: "#", kind: "live" },
      { label: "Case Study", href: "#", kind: "case-study" },
    ],
  },
  {
    slug: "project-4",
    mode: "editorial",
    title: "[Project 4]",
    subtitle:
      "[Project subtitle describing the product in one sentence.]",
    summary:
      "[Project summary describing what was built, why, and what it demonstrates.]",
    keywords: ["Recommendation Systems", "Backend", "Data"],
    screenshots: [{ src: "", alt: "Primary screenshot placeholder" }],
    metrics: [
      { label: "[Label 1]", value: "[Value]" },
      { label: "[Label 2]", value: "[Value]" },
      { label: "[Label 3]", value: "[Value]" },
      { label: "[Label 4]", value: "[Value]" },
    ],
    links: [
      { label: "GitHub", href: "#", kind: "github" },
      { label: "Live", href: "#", kind: "live" },
      { label: "Case Study", href: "#", kind: "case-study" },
    ],
  },
];
