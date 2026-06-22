import type { NavItem } from "@/lib/types";

/**
 * Primary navigation anchors. Order matches the approved wireframe:
 * Work, Experience, Stack, Certs, Connect.
 *
 * `href` values target section ids in the wireframe.
 */
export const navigation: NavItem[] = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#certifications", label: "Certs" },
  { href: "#connect", label: "Connect" },
];
