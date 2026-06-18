import Link from "next/link";
import { ReactNode } from "react";

interface GhostLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function GhostLink({
  children,
  href,
  className = "",
}: GhostLinkProps) {
  return (
    <Link
      href={href}
      className={`font-helvetica-now text-ink no-underline hover:underline decoration-1 transition-all duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}
