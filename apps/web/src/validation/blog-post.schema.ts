import { z } from "zod";

export const blogPostSchema = z.object({
  tagline: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(10),
});

export type BlogPostDTO = z.infer<typeof blogPostSchema>;
