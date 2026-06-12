export type SitePath =
  | "/"
  | "/about"
  | "/contact"
  | "/explore"
  | "/projects"
  | "/timeline"
  | "/writing";

export type NavigationItem = {
  label: string;
  href: SitePath;
};
