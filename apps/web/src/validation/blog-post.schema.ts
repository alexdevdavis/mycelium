import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.number(),
  tagline: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(10),
  created_at: z.string(),
  updated_at: z.string(),
});

export const blogPostDTOSchema = blogPostSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogPostDTO = z.infer<typeof blogPostDTOSchema>;
export const blogPostArraySchema = z.object({
  blogPosts: z.array(blogPostSchema),
});
export const blogPostSingleSchema = z.object({
  blogPost: blogPostSchema,
});
