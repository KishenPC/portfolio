import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type RouteShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function RouteShell({ eyebrow, title, description, children }: RouteShellProps) {
  return (
    <section className="flex flex-1 items-center py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-accent text-sm font-medium uppercase">{eyebrow}</p> : null}
          <h1 className="text-foreground mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-7 sm:text-lg">
            {description}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
