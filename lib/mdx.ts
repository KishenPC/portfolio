import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface ProjectPost {
  slug: string;
  content: string;
  frontmatter: ProjectFrontmatter;
}

const projectsDirectory = path.join(process.cwd(), "projects");

export function loadProjectPost(slug: string): ProjectPost | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      frontmatter: {
        title: (data.title as string) || "Untitled",
        date: (data.date as string) || "",
        description: (data.description as string) || "",
        tags: (data.tags as string[]) || [],
      },
    };
  } catch {
    return null;
  }
}

export function loadAllProjects(): ProjectPost[] {
  try {
    const filenames = fs.readdirSync(projectsDirectory);
    const projects = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        return loadProjectPost(slug);
      })
      .filter((post): post is ProjectPost => post !== null)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      );

    return projects;
  } catch {
    return [];
  }
}
