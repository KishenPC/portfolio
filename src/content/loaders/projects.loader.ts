import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

import { projectSchema, type Project } from "@/content/schemas/project.schema";

const contentRoot = join(process.cwd(), "content", "projects");

function readMetaFile(slug: string): Omit<Project, "slug"> {
  const metaPath = join(contentRoot, slug, "meta.json");
  if (!existsSync(metaPath)) {
    throw new Error(`Missing meta.json for project "${slug}"`);
  }
  const raw = readFileSync(metaPath, "utf-8");
  return JSON.parse(raw) as Omit<Project, "slug">;
}

function readMdxSource(slug: string): string {
  const mdxPath = join(contentRoot, slug, "index.mdx");
  if (!existsSync(mdxPath)) {
    throw new Error(`Missing index.mdx for project "${slug}"`);
  }
  const raw = readFileSync(mdxPath, "utf-8");
  const { content } = matter(raw);
  return content.trim();
}

let cachedProjects: Project[] | null = null;

export function loadProjects(): Project[] {
  if (cachedProjects) return cachedProjects;

  if (!existsSync(contentRoot)) {
    cachedProjects = [];
    return cachedProjects;
  }

  const slugs = readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  cachedProjects = slugs.map((slug) => {
    const meta = readMetaFile(slug);
    const project = projectSchema.parse({ slug, ...meta });
    return project;
  });

  return cachedProjects;
}

export function loadProjectMdx(slug: string): string | undefined {
  try {
    return readMdxSource(slug);
  } catch {
    return undefined;
  }
}
