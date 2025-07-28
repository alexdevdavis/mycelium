import { type JSX } from "react";

export function BlogPost({
  className,
  id,
  tagline,
  author,
  content,
}: {
  className?: string;
  id: string;
  tagline: string;
  author: string;
  content: string;
}): JSX.Element {
  return (
    <article className={className}>
      <h2>{tagline}</h2>
      <p>contributors: {author}</p>
      <p>{content}</p>
    </article>
  );
}
