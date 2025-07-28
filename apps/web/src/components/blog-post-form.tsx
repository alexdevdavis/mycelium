import { useState } from "react";
import type { BlogPostDTO } from "../blog-posts-data";

type BlogPostFormProps = {
  initialValues?: BlogPostDTO;
  buttonText: "save" | "submit";
  onSubmit: (values: BlogPostDTO) => void;
};

export function BlogPostForm({
  initialValues,
  buttonText,
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
    <form onSubmit={handleSubmit}>
      <label>
        Tagline:
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button>{buttonText}</button>
    </form>
  );
}
