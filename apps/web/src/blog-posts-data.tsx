import axios from "axios";

export type BlogPost = {
  id: number;
  tagline: string;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type BlogPostDTO = Omit<BlogPost, "id" | "created_at" | "updated_at">;

export function getBlogPosts() {
  return axios
    .get("/api/v1/blog-posts")
    .then(({ data }: { data: { blogPosts: BlogPost[] } }) => {
      return data;
    });
}

export function getBlogPost(blogPostId: string) {
  return axios
    .get(`/api/v1/blog-posts/${blogPostId}`)
    .then(({ data }: { data: { blogPost: BlogPost } }) => {
      return data.blogPost;
    });
}

export function updateBlogPost(
  blogPostId: string,
  updates: Partial<BlogPostDTO>
) {
  return axios
    .patch(`/api/v1/blog-posts/${blogPostId}`, updates)
    .then(({ data }: { data: { blogPost: BlogPost } }) => {
      return data.blogPost;
    });
}

export function createBlogPost(newPost: BlogPostDTO) {
  return axios
    .post(`/api/v1/blog-posts`, newPost)
    .then(({ data }: { data: { blogPost: BlogPost } }) => {
      return data.blogPost;
    });
}

export async function deleteBlogPost(blogPostId: string) {
  await axios.delete(`/api/v1/blog-posts/${blogPostId}`);
}
