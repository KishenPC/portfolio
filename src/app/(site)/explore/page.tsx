import Link from "next/link";

import { getDomains, getProjects } from "@/content/api";
import { RouteShell } from "@/components/ui/route-shell";

export default function ExplorePage() {
  const domains = getDomains();
  const allProjects = getProjects();

  return (
    <RouteShell
      eyebrow="Explore"
      title="Engineering domains"
      description="Areas of focus that organize projects, skills, and experience into a coherent engineering identity."
    >
      <div className="mt-12">
        <ul className="grid gap-6 sm:grid-cols-2">
          {domains.map((domain) => {
            const domainProjects = allProjects.filter((p) => p.domain === domain.id);

            return (
              <li key={domain.id}>
                <article className="border-border bg-surface hover:bg-surface-strong focus-within:ring-focus rounded-lg border p-6 transition-colors focus-within:ring-2">
                  <h3 className="mb-2 text-lg font-semibold">
                    <Link
                      href={domain.url}
                      className="hover:text-accent focus-visible:text-accent transition-colors"
                    >
                      {domain.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {domain.description}
                  </p>
                  {domain.skills && domain.skills.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Skills
                      </h4>
                      <ul className="flex flex-wrap gap-1.5">
                        {domain.skills.map((skill) => (
                          <li
                            key={skill}
                            className="bg-surface-strong text-muted-foreground rounded-sm px-2 py-0.5 text-xs font-medium"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {domainProjects.length > 0 && (
                    <div>
                      <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Projects ({domainProjects.length})
                      </h4>
                      <ul className="space-y-1">
                        {domainProjects.map((proj) => (
                          <li key={proj.slug}>
                            <Link
                              href={proj.url}
                              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                            >
                              {proj.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </RouteShell>
  );
}
