import Link from "next/link";

import { PrimaryNavigation } from "@/components/navigation/primary-navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/constants/site";

export function SiteHeader() {
  return (
    <header className="border-border bg-surface/95 border-b">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link className="text-foreground text-base font-semibold" href="/">
          {siteConfig.name}
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <PrimaryNavigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
