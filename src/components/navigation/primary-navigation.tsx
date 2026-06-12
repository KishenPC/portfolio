import Link from "next/link";

import { navigationItems } from "@/config/navigation";

export function PrimaryNavigation() {
  return (
    <nav aria-label="Primary navigation">
      <ul className="flex max-w-full flex-wrap gap-1">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              className="text-muted-foreground hover:bg-surface-strong hover:text-foreground focus-visible:bg-surface-strong focus-visible:text-foreground inline-flex min-h-10 items-center rounded-sm px-3 text-sm font-medium transition-colors"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
