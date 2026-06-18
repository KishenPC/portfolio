import { notFound } from "next/navigation";
import { loadProjectPost } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import GhostLink from "@/components/ghost-link";
import SectionReveal from "@/components/animations/section-reveal";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const post = loadProjectPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-putty min-h-screen">
      <Header />

      <SectionReveal>
        <article className="px-16 py-96">
          <GhostLink href="/projects" className="text-sm mb-52 inline-block">
            &larr; Back to Work
          </GhostLink>

          <h1 className="font-davinci text-5xl font-medium text-ink mb-16 leading-[1.0] tracking-tight">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-16 mb-60">
            <span className="font-helvetica-now text-sm text-graphite">
              {post.frontmatter.date}
            </span>
            <div className="flex flex-wrap gap-8">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-helvetica-now text-xs text-graphite bg-bone px-8 py-4 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-lg max-w-[70ch] font-helvetica-now text-base text-ink leading-[1.5] [&_h2]:font-davinci [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mt-96 [&_h2]:mb-20 [&_p]:mb-20 [&_ul]:mb-20 [&_li]:mb-8">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </SectionReveal>

      <Footer />
    </main>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const post = loadProjectPost(slug);

  if (!post) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${post.frontmatter.title} — Structured`,
    description: post.frontmatter.description,
  };
}
