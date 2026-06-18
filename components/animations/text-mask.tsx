"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerScrollTrigger, textMaskConfig } from "@/lib/animation-utils";

registerScrollTrigger();

interface TextMaskProps {
  children: string;
  delay?: number;
  className?: string;
}

export default function TextMask({
  children,
  delay = 0,
  className = "",
}: TextMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = children.split("\n").filter((line) => line.trim().length > 0);
    container.innerHTML = "";

    lines.forEach((line) => {
      const lineEl = document.createElement("span");
      lineEl.className = "text-mask-line";
      lineEl.textContent = line;
      container.appendChild(lineEl);
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".text-mask-line",
        textMaskConfig.from,
        {
          ...textMaskConfig.to,
          delay,
          scrollTrigger: {
            trigger: container,
            ...textMaskConfig.scrollTrigger,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [children, delay]);

  return (
    <div ref={containerRef} className={`text-mask ${className}`}>
      {children}
    </div>
  );
}
