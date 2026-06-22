"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotionContext } from "./reduced-motion-gate";

export interface MagneticLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  /** Maximum magnetic displacement in pixels. @default 12 */
  strength?: number;
  /** Passed through to the `<a>` for external-link safety. */
  target?: string;
  /** Passed through to the `<a>` for external-link safety. */
  rel?: string;
}

/**
 * `MagneticLink` — a link that subtly drifts toward the cursor on hover,
 * creating the magnetic micro-interaction listed in DESIGN.md's approved
 * Hover Interactions. Used by Work Editorial links and Connect elsewhere
 * links (PLAN.md Motion map).
 *
 * **Desktop-only.** Gates on `(pointer: fine)` via `matchMedia` so touch
 * devices get a plain `<a>` — no janky touch-move transforms, no unused
 * listeners. Reduced-motion users also get a plain `<a>`. The `matchMedia`
 * listener is live, so docking a mouse to a touch laptop enables the effect
 * without a reload.
 *
 * **Implementation:** Uses direct DOM manipulation (`el.style.transform`) +
 * CSS transitions instead of Motion's `useMotionValue`/`useSpring`/`motion.a`.
 * This avoids pulling the Motion DOM component (~40 KB gzip) into the initial
 * bundle. The visual effect is equivalent: a quick follow on pointer move
 * (`0.15s ease-out`) and a gentle spring-back return on pointer leave
 * (`0.4s cubic-bezier(0.22, 1, 0.36, 1)` — the same ease-out-expo curve used
 * across the site's motion primitives). No re-renders — transform is set
 * directly on the element via ref.
 *
 * `transform` only (no layout shift); the link's reserved space never
 * changes. Before mount + desktop + not-reduced, renders a plain `<a>`
 * (progressive enhancement).
 */
export function MagneticLink({
  children,
  href,
  className,
  strength = 12,
  target,
  rel,
}: MagneticLinkProps) {
  const reduced = useReducedMotionContext();
  const ref = useRef<HTMLAnchorElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reduced]);

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientX - cx) / rect.width) * strength;
    const y = ((e.clientY - cy) / rect.height) * strength;
    el.style.transition = "transform 0.15s ease-out";
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0px, 0px)";
  }

  if (!enabled) {
    return (
      <a href={href} className={className} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      target={target}
      rel={rel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </a>
  );
}
