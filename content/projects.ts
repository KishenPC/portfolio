import type { Project } from "@/lib/types";

/**
 * Real project data from `.docs/PERSONAL_INFO.md`.
 *
 * 2 featured (FaultLine, Git Social) + 2 editorial (TraceFlow, Compile &
 * Conquer). Titles, subtitles, and summaries are the descriptions from
 * PERSONAL_INFO.md. Keywords are derived faithfully from each project's
 * own highlights — no invented themes.
 *
 * Fields not present in PERSONAL_INFO.md remain as placeholders:
 * - `screenshots[].src` — real screenshots arrive in TASKS.md Task 22
 * - `metrics` — no quantitative metrics documented yet
 * - `links[].href` — no individual project URLs documented; "#" placeholders
 * - `narrative` (featured) — no Context/Approach/Outcome narrative written yet
 * - `detail.mdx` — no long-form MDX content written yet
 */
export const projects: Project[] = [
  {
    slug: "faultline",
    mode: "featured",
    title: "FaultLine",
    subtitle:
      "Fault injection platform designed for testing and understanding application behavior under failure conditions.",
    summary:
      "Fault injection platform designed for testing and understanding application behavior under failure conditions.",
    keywords: ["Developer Tooling", "Testing", "Fault Injection", "Interactive"],
    screenshots: [
      { src: "", alt: "FaultLine primary screenshot" },
      { src: "", alt: "FaultLine secondary screenshot" },
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
    slug: "git-social",
    mode: "featured",
    title: "Git Social",
    subtitle:
      "Developer discovery platform inspired by social content feeds.",
    summary:
      "Developer discovery platform inspired by social content feeds.",
    keywords: ["Developer Discovery", "Recommendation", "Social", "Personalization"],
    screenshots: [
      { src: "", alt: "Git Social primary screenshot" },
      { src: "", alt: "Git Social secondary screenshot" },
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
    slug: "traceflow",
    mode: "editorial",
    title: "TraceFlow",
    subtitle:
      "Interactive algorithm visualization platform.",
    summary:
      "Interactive algorithm visualization platform.",
    keywords: ["Visualization", "Education", "Interactive", "Algorithms"],
    screenshots: [{ src: "", alt: "TraceFlow primary screenshot" }],
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
    slug: "compile-and-conquer",
    mode: "editorial",
    title: "Compile & Conquer",
    subtitle:
      "Adaptive DSA recommendation platform.",
    summary:
      "Adaptive DSA recommendation platform.",
    keywords: ["Recommendation Systems", "Education", "Personalization", "DSA"],
    screenshots: [{ src: "", alt: "Compile & Conquer primary screenshot" }],
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
