import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createBlogPost } from "../api/blog-posts-data";
import { type BlogPostDTO } from "../validation/blog-post.schema";
import { BlogPostForm } from "../components/blog-post-form";

export const Route = createFileRoute("/create")({
  component: CreateBlogPost,
});

function CreateBlogPost() {
  const router = useRouter();

  const handleSubmit = async (values: BlogPostDTO) => {
    await createBlogPost(values);
    router.navigate({
      to: "/",
    });
  };

  return (
    <BlogPostForm
      className="create-blog-post__form"
      buttonText="submit"
      onSubmit={handleSubmit}
    />
  );
}
