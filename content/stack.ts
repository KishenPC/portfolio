import type { StackGroup } from "@/lib/types";

/**
 * Real skill stack data from `.docs/PERSONAL_INFO.md`.
 * 5 groups, 22 items total. `logo` paths are empty — the consuming
 * `LogoPlaceholder` component renders a placeholder box with the item's name
 * when `logo` is empty. Real logos arrive later.
 */
export const stack: StackGroup[] = [
  {
    name: "Languages",
    items: [
      { name: "C", logo: "" },
      { name: "C++", logo: "" },
      { name: "Java", logo: "" },
      { name: "JavaScript", logo: "" },
      { name: "TypeScript", logo: "" },
      { name: "Python", logo: "" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    items: [
      { name: "React", logo: "" },
      { name: "Next.js", logo: "" },
      { name: "React Native", logo: "" },
      { name: "Expo", logo: "" },
      { name: "TailwindCSS", logo: "" },
      { name: "GSAP", logo: "" },
    ],
  },
  {
    name: "Backend & Infrastructure",
    items: [
      { name: "Node.js", logo: "" },
      { name: "Express.js", logo: "" },
      { name: "Prisma", logo: "" },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "PostgreSQL", logo: "" },
      { name: "Supabase", logo: "" },
      { name: "Firebase", logo: "" },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git", logo: "" },
      { name: "GitHub", logo: "" },
      { name: "Vercel", logo: "" },
      { name: "Postman", logo: "" },
    ],
  },
];
