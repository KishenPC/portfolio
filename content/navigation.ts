import type { NavItem } from "@/lib/types";

/**
 * Primary navigation anchors. Order matches the approved wireframe:
 * Work, Experience, Stack, Awards, Certs, Connect.
 *
 * `href` values target section ids in the wireframe (`#recognition` is the
 * Awards section id — label is human-friendly "Awards").
 */
export const navigation: NavItem[] = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#recognition", label: "Awards" },
  { href: "#certifications", label: "Certs" },
  { href: "#connect", label: "Connect" },
];
