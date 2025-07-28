import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogPost } from "@repo/ui/blog-post";
import { Button } from "@repo/ui/button";
import { getBlogPost } from "../../blog-posts-data";

export const Route = createFileRoute("/$blogPostId/")({
  component: BlogPostView,
  loader: async ({ params: { blogPostId } }) => getBlogPost(blogPostId),
});

function BlogPostView() {
  const { id, tagline, content, author } = Route.useLoaderData();

  return (
    <>
      <BlogPost
        id={id.toString()}
        tagline={tagline}
        content={content}
        author={author}
      />
      <Link to="/$blogPostId/edit" params={{ blogPostId: id.toString() }}>
        <Button children={"edit"} clickHandler={() => {}} />
      </Link>
    </>
  );
}
