interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={`
        flex items-center justify-between 
        px-16 py-8
        border-b border-vellum
        bg-putty
        ${className}
      `}
    >
      <h1 className="font-davinci text-2xl font-medium text-ink">
        Structured
      </h1>

      <nav className="flex items-center gap-8">
        <a
          href="#work"
          className="font-helvetica-now text-sm text-ink hover:opacity-80 transition-opacity"
        >
          Work
        </a>
        <a
          href="#about"
          className="font-helvetica-now text-sm text-ink hover:opacity-80 transition-opacity"
        >
          About
        </a>
        <a
          href="#contact"
          className="font-helvetica-now text-sm text-ink hover:opacity-80 transition-opacity"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
