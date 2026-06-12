import { z } from "zod";

export const domainSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  skills: z.array(z.string()).min(1).optional(),
});

export type Domain = z.infer<typeof domainSchema>;
