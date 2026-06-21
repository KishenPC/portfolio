"use client";

import { useEffect, useMemo, useState } from "react";
import type { NavItem } from "@/lib/types";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { NavAnchor } from "./nav-anchor";
import { MobileMenu } from "./mobile-menu";
import { ScrollProgress } from "./scroll-progress";

interface SiteNavProps {
  items: NavItem[];
  name: string;
}

/**
 * Fixed primary navigation. Transparent over the hero, then resolves to
 * surface + hairline border once the page is scrolled. Composes the scroll
 * progress hairline, desktop anchor list, and mobile menu.
 *
 * Data is passed in from a server component (`app/page.tsx`) so the content
 * modules stay out of the client bundle; only the serializable nav items and
 * name cross the boundary.
 */
export function SiteNav({ items, name }: SiteNavProps) {
  const ids = useMemo(() => items.map((item) => item.href.slice(1)), [items]);
  const activeId = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 h-16 transition-colors duration-300",
        scrolled
          ? "bg-surface border-b border-line"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <ScrollProgress />
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-6">
        <a
          href="#main"
          className="rounded font-display font-medium text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {name}
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 md:flex lg:gap-6"
        >
          {items.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              label={item.label}
              active={activeId === item.href.slice(1)}
              className="px-1.5 py-1 text-sm"
            />
          ))}
        </nav>
        <MobileMenu items={items} activeId={activeId} />
      </div>
    </header>
  );
}
