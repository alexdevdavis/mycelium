import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { BlogPost } from "../../components/blog-post";
import { Button } from "@repo/ui/button";
import { getBlogPost } from "../../api/blog-posts-data";
import "./index.css";

export const Route = createFileRoute("/$blogPostId/")({
  component: BlogPostView,
  loader: async ({ params: { blogPostId } }) => getBlogPost(blogPostId),
});

function BlogPostView() {
  const { id, tagline, content, author } = Route.useLoaderData();
  const router = useRouter();
  const handleClick = () => {
    router.navigate({ to: `/${id}/edit` });
  };

  return (
    <div className="blog-post-view">
      <BlogPost
        children={
          <Button
            className="blog-post-view__button"
            buttonText={"edit"}
            clickHandler={handleClick}
          />
        }
        id={id.toString()}
        tagline={tagline}
        content={content}
        author={author}
        className="blog-post-view__article"
      />
    </div>
  );
}
