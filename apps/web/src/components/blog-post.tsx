import { type JSX, type ReactNode } from "react";

export function BlogPost({
  className,
  id,
  tagline,
  author,
  content,
  children,
}: {
  className?: string;
  id: string;
  tagline: string;
  author: string;
  content: string;
  children?: ReactNode;
}): JSX.Element {
  return (
    <article className={className}>
      <h2>{tagline}</h2>
      {children && children}
      <p>
        <span>contributors:</span> {author}
      </p>
      <div>{content}</div>
    </article>
  );
}
