import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogItem } from "../components/blog-item";
import { getBlogPosts } from "../blog-posts-data";
import "./index.css";

export const Route = createFileRoute("/")({
  component: Home,
  loader: getBlogPosts,
});

function Home() {
  const { blogPosts } = Route.useLoaderData();
  return (
    <div>
      <ul>
        {blogPosts.map(({ id, tagline }) => (
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
