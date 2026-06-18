import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Display({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`font-davinci text-6xl font-medium leading-[0.84] tracking-tight text-ink ${className}`}
    >
      {children}
    </h1>
  );
}

export function Heading({ children, className = "" }: TypographyProps) {
  return (
    <h2
      className={`font-davinci text-4xl font-medium leading-[1.0] tracking-tight text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

export function SubHeading({ children, className = "" }: TypographyProps) {
  return (
    <h3
      className={`font-davinci text-xl font-normal leading-[1.33] text-ink ${className}`}
    >
      {children}
    </h3>
  );
}

export function Body({ children, className = "" }: TypographyProps) {
  return (
    <p
      className={`font-helvetica-now text-base leading-[1.5] text-graphite ${className}`}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className = "" }: TypographyProps) {
  return (
    <span
      className={`font-helvetica-now text-sm leading-[1.5] text-graphite ${className}`}
    >
      {children}
    </span>
  );
}
