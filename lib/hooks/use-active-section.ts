"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently active in the viewport via
 * `IntersectionObserver`. Returns the id of the section occupying the active
 * band — a thin horizontal slice around the top third of the viewport — or
 * `null` when no observed section is active (e.g. over the hero).
 *
 * The root margin `-40% 0px -55% 0px` collapses the observation area to a
 * ~5% band; a section becomes active as its top edge crosses that band. This
 * is the standard scroll-spy pattern and stays stable through fast scrolling.
 *
 * Gracefully no-ops when sections are not yet present in the DOM (the
 * observer simply has nothing to observe), so it is safe to mount before the
 * sections it references exist.
 *
 * @param ids section ids to observe (without the leading `#`).
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
