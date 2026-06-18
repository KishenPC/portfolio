import GhostLink from "@/components/ghost-link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={`
        sticky top-0 z-50
        flex items-center justify-between
        px-16 py-8
        border-b border-vellum
        bg-putty
        ${className}
      `}
    >
      <span className="font-davinci text-2xl font-medium text-ink">
        Structured
      </span>

      <nav className="flex items-center gap-8">
        <GhostLink href="#work" className="text-sm">
          Work
        </GhostLink>
        <GhostLink href="#about" className="text-sm">
          About
        </GhostLink>
        <GhostLink href="#contact" className="text-sm">
          Contact
        </GhostLink>
      </nav>
    </header>
  );
}
