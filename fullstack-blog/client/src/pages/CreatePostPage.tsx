import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post, reqError } from "../types";

function CreatePostPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.status !== 201) {
        const data = (await res.json()) as reqError;

        if (res.status === 500) {
          throw new Error(
            `Error ${res.status} - ${data.error} - ${data.message}`
          );
        }

        throw new Error(`Error ${res.status} - ${data.message}`);
      }

      const data = (await res.json()) as Post;

      const newId = data.id;

      navigate(`/posts/${newId}`);
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "10px" }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
          />
        </div>
        <div style={{ margin: "10px" }}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
