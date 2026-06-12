import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { RouteShell } from "@/components/ui/route-shell";

export default function NotFound() {
  return (
    <AppShell>
      <RouteShell
        eyebrow="404"
        title="Page not found"
        description="The page you are looking for does not exist."
      >
        <Link className="text-accent text-sm font-medium underline" href="/">
          Return home
        </Link>
      </RouteShell>
    </AppShell>
  );
}
