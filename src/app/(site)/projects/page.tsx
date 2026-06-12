import Link from "next/link";

import { getProjects } from "@/content/api";
import { RouteShell } from "@/components/ui/route-shell";

export default function ProjectsPage() {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <RouteShell
      eyebrow="Explore"
      title="Projects"
      description="Projects presented as systems with architecture, constraints, tradeoffs, and outcomes."
    >
      <div className="mt-12 space-y-16">
        {featured.length > 0 && (
          <section>
            <h2 className="text-muted-foreground mb-6 text-xs font-semibold tracking-wider uppercase">
              Featured
            </h2>
            <ul className="grid gap-8 sm:grid-cols-2">
              {featured.map((project) => (
                <li key={project.slug}>
                  <article className="border-border bg-surface hover:bg-surface-strong focus-within:ring-focus rounded-lg border p-6 transition-colors focus-within:ring-2">
                    <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                      <span>{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        {project.status}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      <Link
                        href={project.url}
                        className="hover:text-accent focus-visible:text-accent transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.summary}
                    </p>
                    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                      {project.tech.map((t) => (
                        <li
                          key={t}
                          className="bg-surface-strong text-muted-foreground rounded-sm px-2 py-0.5 text-xs font-medium"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}

        {rest.length > 0 && (
          <section>
            <h2 className="text-muted-foreground mb-6 text-xs font-semibold tracking-wider uppercase">
              More projects
            </h2>
            <ul className="divide-border divide-y">
              {rest.map((project) => (
                <li key={project.slug}>
                  <article className="focus-within:ring-focus flex flex-col gap-3 py-6 focus-within:ring-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="mb-1 text-base font-semibold">
                        <Link
                          href={project.url}
                          className="hover:text-accent focus-visible:text-accent transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm">{project.summary}</p>
                    </div>
                    <ul className="flex shrink-0 flex-wrap gap-1" aria-label="Technologies">
                      {project.tech.slice(0, 3).map((t) => (
                        <li
                          key={t}
                          className="bg-surface-strong text-muted-foreground rounded-sm px-2 py-0.5 text-xs font-medium"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </RouteShell>
  );
}
