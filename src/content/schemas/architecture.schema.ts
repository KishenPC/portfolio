import { z } from "zod";

export const architectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.string().min(1),
});

export const architectureEdgeSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
  label: z.string().optional(),
});

export const architectureSchema = z.object({
  nodes: z.array(architectureNodeSchema),
  edges: z.array(architectureEdgeSchema),
  metadata: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    domain: z.string().min(1),
  }),
});

export type Architecture = z.infer<typeof architectureSchema>;
