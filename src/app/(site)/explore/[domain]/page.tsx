import { notFound } from "next/navigation";
import Link from "next/link";

import { getDomain, getDomains, getProjects } from "@/content/api";
import { Container } from "@/components/ui/container";

type DomainPageProps = {
  params: Promise<{ domain: string }>;
};

export async function generateStaticParams() {
  return getDomains().map((domain) => ({
    domain: domain.id,
  }));
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { domain: domainId } = await params;
  const domain = getDomain(domainId);

  if (!domain) {
    notFound();
  }

  const allProjects = getProjects();
  const domainProjects = allProjects.filter((p) => p.domain === domainId);

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-12">
        <Link
          href="/explore"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <span aria-hidden="true">←</span> All domains
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{domain.title}</h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            {domain.description}
          </p>
          {domain.skills && domain.skills.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
              {domain.skills.map((skill) => (
                <li
                  key={skill}
                  className="bg-surface-strong text-muted-foreground rounded-md px-3 py-1 text-sm font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </header>

        {domainProjects.length > 0 ? (
          <section>
            <h2 className="text-muted-foreground mb-6 text-xs font-semibold tracking-wider uppercase">
              Projects in this domain
            </h2>
            <ul className="grid gap-8 sm:grid-cols-2">
              {domainProjects.map((project) => (
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
        ) : (
          <p className="text-muted-foreground">No projects in this domain yet.</p>
        )}
      </Container>
    </main>
  );
}
