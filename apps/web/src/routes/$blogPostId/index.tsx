import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogPost } from "../../components/blog-post";
import { Button } from "@repo/ui/button";
import { getBlogPost } from "../../blog-posts-data";
import "./index.css";

export const Route = createFileRoute("/$blogPostId/")({
  component: BlogPostView,
  loader: async ({ params: { blogPostId } }) => getBlogPost(blogPostId),
});

function BlogPostView() {
  const { id, tagline, content, author } = Route.useLoaderData();

  return (
    <div className="blog-post-view">
      <BlogPost
        id={id.toString()}
        tagline={tagline}
        content={content}
        author={author}
        className="blog-post-view__article"
      />
      <Link to="/$blogPostId/edit" params={{ blogPostId: id.toString() }}>
        <Button buttonText={"edit"} clickHandler={() => {}} />
      </Link>
    </div>
  );
}
