import { notFound } from "next/navigation";
import Link from "next/link";

import { getProject, getProjectMdx, getProjects } from "@/content/api";
import { Container } from "@/components/ui/container";
import { MdxContent } from "@/components/content/mdx-content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const mdxSource = getProjectMdx(slug);

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-12">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header className="mb-12">
          <div className="text-muted-foreground mb-3 flex items-center gap-3 text-sm">
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              {project.status}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            {project.description}
          </p>
          {project.tech.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="bg-surface-strong text-muted-foreground rounded-md px-3 py-1 text-sm font-medium"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
          {(project.links.live ?? project.links.repo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Live site
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  rel="noopener noreferrer"
                  className="border-border bg-surface hover:bg-surface-strong inline-flex items-center gap-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                >
                  Repository
                </a>
              )}
            </div>
          )}
        </header>

        {mdxSource ? (
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <MdxContent source={mdxSource} />
          </article>
        ) : (
          <p className="text-muted-foreground">No additional content available.</p>
        )}
      </Container>
    </main>
  );
}
