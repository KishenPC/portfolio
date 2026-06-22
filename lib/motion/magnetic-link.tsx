"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
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
 * Motion listeners. Reduced-motion users also get a plain `<a>`. The
 * `matchMedia` listener is live, so docking a mouse to a touch laptop
 * enables the effect without a reload.
 *
 * Uses Motion's `useSpring` for smooth displacement + return. The spring
 * config (`stiffness: 200, damping: 15`) gives a quick, precise pull that
 * eases back gently — subtle, not springy/bouncy, matching DESIGN.md's
 * "Subtle only" hover constraint. `transform` only (no layout shift); the
 * link's reserved space never changes.
 *
 * Before mount, renders a plain `<a>` (progressive enhancement). After
 * mount + desktop + not-reduced, swaps to `motion.a` with spring-driven
 * `x`/`y` transforms.
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

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
    x.set(((e.clientX - cx) / rect.width) * strength);
    y.set(((e.clientY - cy) / rect.height) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  if (!enabled) {
    return (
      <a href={href} className={className} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      target={target}
      rel={rel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.a>
  );
}
