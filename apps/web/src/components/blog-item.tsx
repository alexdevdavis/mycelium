import { type JSX } from "react";

export function BlogItem({
  className,
  tagline,
}: {
  className?: string;
  tagline: string;
}): JSX.Element {
  return <h2>{tagline}</h2>;
}
