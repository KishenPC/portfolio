"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

/**
 * ProjectDetail — an accessible in-page disclosure for the long-form
 * project detail (MDX). Replaces the wireframe's static "Expandable
 * in-page detail ↓" hint with a real toggle.
 *
 * Uses the WAI-ARIA disclosure pattern: a `<button>` with `aria-expanded`
 * + `aria-controls` reveals a region whose `id` matches the control. The
 * panel uses the `hidden` attribute so screen readers skip collapsed
 * content and no motion is required to access it (per DESIGN.md: "No
 * interaction should depend solely on animation"). Reduced-motion users
 * get the same toggle with no animation; the state change is instant.
 *
 * Content is passed as children so the consumer (FeaturedProject) controls
 * how MDX is loaded and rendered; this primitive owns only the toggle
 * affordance and the expand/collapse state.
 */
export interface ProjectDetailProps {
  /** Label on the toggle button, e.g. "Expandable in-page detail". */
  label: string;
  /** Content revealed on expand. */
  children: ReactNode;
  className?: string;
}

export function ProjectDetail({ label, children, className }: ProjectDetailProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded py-1 font-mono text-caption text-ink-3 transition-colors hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {label}
        <span aria-hidden="true">{open ? "\u2191" : "\u2193"}</span>
      </button>
      <div id={panelId} hidden={!open} className="mt-4">
        {children}
      </div>
    </div>
  );
}
