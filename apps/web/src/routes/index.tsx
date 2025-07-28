import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogItem } from "@repo/ui/blog-item";
import { getBlogPosts } from "../blog-posts-data";

export const Route = createFileRoute("/")({
  component: Home,
  loader: getBlogPosts,
});

function Home() {
  const data = Route.useLoaderData();
  return (
    <div>
      <h2 className="text-2xl mb-4">All Blog Posts</h2>
      <ul>
        {data.blogPosts.map(({ id, tagline }) => (
          <Link
            to={"/$blogPostId"}
            params={{ blogPostId: id.toString() }}
            key={id}
          >
            <BlogItem tagline={tagline} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
