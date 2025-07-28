import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  getBlogPost,
  updateBlogPost,
  type BlogPostDTO,
} from "../../blog-posts-data";
import { BlogPostForm } from "../../components/blog-post-form";
import "./edit.css";

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

  return (
    <BlogPostForm
      initialValues={blogPost}
      buttonText="save"
      onSubmit={handleSubmit}
      className={"edit-blog-post__form"}
    />
  );
}
