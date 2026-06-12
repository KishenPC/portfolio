import type { ReactNode } from "react";

import { MainContent } from "@/components/layout/main-content";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col">
      <SkipLink />
      <SiteHeader />
      <MainContent>{children}</MainContent>
      <SiteFooter />
    </div>
  );
}
