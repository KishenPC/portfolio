import Link from "next/link";
import { loadAllProjects } from "@/lib/mdx";
import SectionReveal from "@/components/animations/section-reveal";
import SectionTitle from "@/components/section-title";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ProjectsPage() {
  const projects = loadAllProjects();

  return (
    <main className="bg-putty min-h-screen">
      <Header />

      <SectionReveal>
        <section className="px-16 py-96">
          <SectionTitle className="mb-52">Work</SectionTitle>

          {projects.length === 0 ? (
            <p className="font-helvetica-now text-base text-graphite">
              No projects yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-52">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="block bg-bone rounded-lg p-24 hover:opacity-80 transition-opacity border border-vellum"
                >
                  <h2 className="font-davinci text-2xl font-medium text-ink mb-8">
                    {project.frontmatter.title}
                  </h2>
                  <p className="font-helvetica-now text-sm text-graphite mb-16">
                    {project.frontmatter.date}
                  </p>
                  <p className="font-helvetica-now text-base text-ink mb-16">
                    {project.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-8">
                    {project.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-helvetica-now text-xs text-graphite bg-chalk px-8 py-4 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </SectionReveal>

      <Footer />
    </main>
  );
}
