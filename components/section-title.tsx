interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`
        text-5xl font-davinci font-medium text-ink
        border-b border-vellum pb-4
        leading-tight tracking-tight
        ${className}
      `}
    >
      {children}
    </h2>
  );
}
