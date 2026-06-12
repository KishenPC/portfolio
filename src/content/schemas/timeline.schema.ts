import { z } from "zod";

export const timelineEventSchema = z.object({
  year: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  relatedProjects: z.array(z.string()),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;
