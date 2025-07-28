import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogItem } from "@repo/ui/blog-item";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const res = await fetch("/api/v1/blog-posts");
    return res.json();
  },
});

function Home() {
  const data = Route.useLoaderData();
  return (
    <div>
      <h2 className="text-2xl mb-4">All Blog Posts</h2>
      <ul>
        {data.blogPosts.map(({ id, tagline }) => (
          <Link to={`/${id}`} key={id}>
            <BlogItem tagline={tagline} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
