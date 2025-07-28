import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BlogPost } from "@repo/ui/blog-post";

export const Route = createFileRoute("/$blogPostId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const res = await fetch(`/api/v1/blog-posts/${params.blogPostId}`);
    return res.json();
  },
});

function RouteComponent() {
  const {
    blogPost: { id, tagline, content, author },
  } = Route.useLoaderData();
  return (
    <BlogPost id={id} tagline={tagline} content={content} author={author} />
  );
}
