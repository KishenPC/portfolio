export default function Footer() {
  return (
    <footer className="px-16 py-20 bg-chalk border-t border-vellum text-center" id="contact">
      <p className="font-helvetica-now text-xs text-graphite">
        © {new Date().getFullYear()} Structured. All rights reserved.
      </p>
      <div className="flex items-center justify-center gap-8 mt-8">
        <a
          href="https://github.com/KishenPC"
          target="_blank"
          rel="noopener noreferrer"
          className="font-helvetica-now text-xs text-ink hover:underline decoration-1"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/kishen-pc-a68b41320/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-helvetica-now text-xs text-ink hover:underline decoration-1"
        >
          LinkedIn
        </a>
        <a
          href="mailto:kishen@example.com"
          className="font-helvetica-now text-xs text-ink hover:underline decoration-1"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
