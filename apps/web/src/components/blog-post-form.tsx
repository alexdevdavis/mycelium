import { useState } from "react";
import type { BlogPostDTO } from "../blog-posts-data";

type BlogPostFormProps = {
  initialValues?: BlogPostDTO;
  buttonText: "save" | "submit";
  className: string;
  onSubmit: (values: BlogPostDTO) => void;
};

export function BlogPostForm({
  initialValues,
  buttonText,
  className,
  onSubmit,
}: BlogPostFormProps) {
  const [tagline, setTagline] = useState(initialValues?.tagline ?? "");
  const [author, setAuthor] = useState(initialValues?.author ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ tagline, author, content });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label htmlFor="tagline">Tagline:</label>
      <input
        id="tagline"
        type="text"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
      />
      <label htmlFor="author">Author:</label>
      <input
        id="author"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button>{buttonText}</button>
    </form>
  );
}
