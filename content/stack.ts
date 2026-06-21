import type { StackGroup, StackItem } from "@/lib/types";

/**
 * Generates `count` placeholder stack items for a group. Each item gets a
 * unique `[<Group> <n>]` name so accessible names and React keys are unique.
 * `logo` is empty — the consuming `LogoPlaceholder` component renders a
 * placeholder box when `logo` is empty. Real logos arrive later.
 */
function items(prefix: string, count: number): StackItem[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `[${prefix} ${i + 1}]`,
    logo: "",
  }));
}

/**
 * Placeholder stack groups mirroring the frozen wireframe SkillStack section.
 * 7 groups, counts match the wireframe exactly
 * (Frontend 4, Backend 3, Mobile 3, Languages 6, Databases 3, Tools 4, Cloud 2).
 */
export const stack: StackGroup[] = [
  { name: "Frontend", items: items("Frontend", 4) },
  { name: "Backend", items: items("Backend", 3) },
  { name: "Mobile", items: items("Mobile", 3) },
  { name: "Languages", items: items("Languages", 6) },
  { name: "Databases", items: items("Databases", 3) },
  { name: "Tools", items: items("Tools", 4) },
  { name: "Cloud", items: items("Cloud", 2) },
];
