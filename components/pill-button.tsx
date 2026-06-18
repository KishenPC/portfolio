interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function PillButton({
  children,
  href,
  onClick,
  className = "",
}: PillButtonProps) {
  const baseStyles =
    "inline-block px-[17px] py-[9px] bg-ink text-paper font-helvetica-now text-xs font-normal rounded-full transition-opacity duration-200 hover:opacity-80 cursor-pointer";

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
}
