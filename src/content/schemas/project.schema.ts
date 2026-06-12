import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()).min(1),
  year: z.number().int().positive(),
  status: z.enum(["active", "complete", "planned"]),
  featured: z.boolean(),
  domain: z.string().min(1),
  links: z.object({
    live: z.string().url().optional(),
    repo: z.string().url().optional(),
  }),
  architectureRef: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;
