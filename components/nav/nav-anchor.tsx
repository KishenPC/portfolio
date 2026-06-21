"use client";

import type { ComponentPropsWithoutRef } from "react";

type NavAnchorProps = {
  href: string;
  label: string;
  /** Whether this anchor points to the currently active section. */
  active?: boolean;
  /** Called on click before the default anchor navigation (e.g. to close a menu). */
  onNavigate?: () => void;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick" | "className">;

/**
 * A single navigation anchor. Shared by the desktop bar and the mobile menu —
 * sizing/layout is controlled by the caller via `className`, while active
 * state, focus ring, and color transitions live here so they stay consistent.
 *
 * Active anchors render `aria-current="true"`; focus uses the accent ring per
 * DESIGN.md accessibility rules.
 */
export function NavAnchor({
  href,
  label,
  active = false,
  onNavigate,
  className,
  ...rest
}: NavAnchorProps) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      onClick={onNavigate}
      className={[
        "inline-flex items-center rounded transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active ? "text-ink" : "text-ink-2 hover:text-ink",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {label}
    </a>
  );
}
