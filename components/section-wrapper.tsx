import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  isDarkSection?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  isDarkSection = false,
}: SectionWrapperProps) {
  return (
    <section
      className={`
        px-16 py-96
        md:px-8 md:py-52
        max-sm:px-4 max-sm:py-32
        mb-[80px]
        ${isDarkSection ? "dark-section" : "bg-putty text-ink"}
        ${className}
      `}
    >
      {children}
    </section>
  );
}
