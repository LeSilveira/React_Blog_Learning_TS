import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../store/authSlice";
import { Post, reqError } from "../types";

function CreatePostPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const token = useSelector(selectCurrentToken);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to create a post!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

      navigate(`/posts/${data.id}`);
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
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ margin: "10px" }}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
