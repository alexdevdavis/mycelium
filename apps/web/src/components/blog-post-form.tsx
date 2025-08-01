import { useState } from "react";
import { type BlogPostDTO } from "../validation/blog-post.schema";
import { blogPostDTOSchema } from "../validation/blog-post.schema";

type BlogPostFormProps = {
  initialValues?: BlogPostDTO;
  buttonText: "save" | "submit";
  className: string;
  onSubmit: (values: BlogPostDTO) => void;
  handleDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

export function BlogPostForm({
  initialValues,
  buttonText,
  className,
  onSubmit,
  handleDelete,
}: BlogPostFormProps) {
  const [tagline, setTagline] = useState(initialValues?.tagline ?? "");
  const [author, setAuthor] = useState(initialValues?.author ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [errors, setErrors] = useState<
    Partial<Record<keyof BlogPostDTO, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = blogPostDTOSchema.safeParse({ tagline, author, content });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BlogPostDTO, string>> = {};
      const flattened = result.error.flatten().fieldErrors;

      for (const key in flattened) {
        const typedKey = key as keyof BlogPostDTO;
        const messages = flattened[typedKey];
        if (messages?.[0]) fieldErrors[key as keyof BlogPostDTO] = messages[0];
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={className}>
        <label htmlFor="tagline">Tagline:</label>
        <input
          id="tagline"
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
        {errors.tagline && <p className="form-error">{errors.tagline}</p>}

        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <p className="form-error">{errors.author}</p>}

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && <p className="form-error">{errors.content}</p>}
        <button type="submit">{buttonText}</button>
      </form>
      {initialValues && (
        <button className="delete-button" onClick={handleDelete}>
          delete this post
        </button>
      )}
    </>
  );
}
