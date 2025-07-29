import axios from "axios";
import {
  blogPostArraySchema,
  blogPostSingleSchema,
  blogPostDTOSchema,
  type BlogPostDTO,
} from "./validation/blog-post.schema";

export function getBlogPosts() {
  return axios.get("/api/v1/blog-posts").then(({ data }) => {
    const result = blogPostArraySchema.safeParse(data);
    if (!result.success) throw new Error("Invalid blog post array data");
    return result.data;
  });
}

export function getBlogPost(blogPostId: string) {
  return axios.get(`/api/v1/blog-posts/${blogPostId}`).then(({ data }) => {
    const result = blogPostSingleSchema.safeParse(data);
    if (!result.success) throw new Error("Invalid blog post object");
    return result.data.blogPost;
  });
}

export function updateBlogPost(
  blogPostId: string,
  updates: Partial<BlogPostDTO>
) {
  return axios
    .patch(`/api/v1/blog-posts/${blogPostId}`, updates)
    .then(({ data }) => {
      const result = blogPostSingleSchema.safeParse(data);
      if (!result.success) throw new Error("Invalid response from update");
      return result.data.blogPost;
    });
}

export function createBlogPost(newPost: BlogPostDTO) {
  const parseInput = blogPostDTOSchema.safeParse(newPost);
  if (!parseInput.success) throw new Error("invalid input payload");

  return axios.post(`/api/v1/blog-posts`, newPost).then(({ data }) => {
    const result = blogPostSingleSchema.safeParse(data);
    if (!result.success) throw new Error("Invalid blog post response");
    return result.data;
  });
}

export async function deleteBlogPost(blogPostId: string) {
  await axios.delete(`/api/v1/blog-posts/${blogPostId}`);
}
