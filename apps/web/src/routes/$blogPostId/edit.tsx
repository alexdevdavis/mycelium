import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  deleteBlogPost,
  getBlogPost,
  updateBlogPost,
} from "../../blog-posts-data";
import { type BlogPostDTO } from "../../validation/blog-post.schema";
import { BlogPostForm } from "../../components/blog-post-form";

export const Route = createFileRoute("/$blogPostId/edit")({
  loader: async ({ params: { blogPostId } }) => getBlogPost(blogPostId),
  component: BlogPostEditor,
});

function BlogPostEditor() {
  const router = useRouter();
  const blogPost = Route.useLoaderData();

  const handleSubmit = async (values: BlogPostDTO) => {
    await updateBlogPost(blogPost.id.toString(), values);
    router.navigate({
      to: "/$blogPostId",
      params: { blogPostId: blogPost.id.toString() },
    });
  };

  const handleDelete = async () => {
    await deleteBlogPost(blogPost.id.toString());
    router.navigate({
      to: "/",
    });
  };

  return (
    <BlogPostForm
      initialValues={blogPost}
      buttonText="save"
      onSubmit={handleSubmit}
      handleDelete={handleDelete}
      className={"edit-blog-post__form"}
    />
  );
}
