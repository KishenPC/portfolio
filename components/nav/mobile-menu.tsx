"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { NavItem } from "@/lib/types";
import { NavAnchor } from "./nav-anchor";

interface MobileMenuProps {
  items: NavItem[];
  /** id of the currently active section (without `#`), or null. */
  activeId: string | null;
}

/**
 * Mobile navigation: a hamburger button (visible below `md`) that opens a
 * full-viewport panel of large, stacked anchors.
 *
 * Accessibility:
 * - `aria-expanded` / `aria-controls` on the trigger button.
 * - Focus moves to the first link on open; Esc closes and restores focus to
 *   the trigger.
 * - Tab/Shift+Tab cycle within the panel (focus trap).
 * - Body scroll is locked while open.
 * - Selecting a link closes the panel and returns focus to the trigger before
 *   the browser performs the anchor jump.
 * - Resizing up to `md` automatically closes the panel so the desktop bar
 *   takes over cleanly.
 */
export function MobileMenu({ items, activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Move focus to the first link when the panel opens.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(
      "[data-menu-link]",
    );
    first?.focus();
  }, [open]);

  // Esc closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close when the viewport reaches the desktop breakpoint.
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const links = panelRef.current?.querySelectorAll<HTMLElement>(
      "[data-menu-link]",
    );
    if (!links || links.length === 0) return;
    const first = links[0];
    const last = links[links.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? "mobile-menu-panel" : undefined}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-12 w-12 items-center justify-center rounded text-ink-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
      {open && (
        <div
          id="mobile-menu-panel"
          ref={panelRef}
          onKeyDown={onKeyDown}
          className="fixed top-16 left-0 right-0 bottom-0 z-30 flex flex-col overflow-y-auto bg-bg px-6 py-8"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {items.map((item) => (
              <NavAnchor
                key={item.href}
                href={item.href}
                label={item.label}
                active={activeId === item.href.slice(1)}
                onNavigate={close}
                data-menu-link
                className="w-full min-h-12 rounded px-2 py-3 text-2xl font-display"
              />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
