import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);

        if (res.status === 500) {
          throw new Error(
            `Error ${res.status} - $${res.error} - ${res.message}`
          );
        }

        if (res.status !== 200) {
          throw new Error(`Error ${res.status} - ${res.message}`);
        }

        const data = await res.json();

        setTitle(data.title);
        setContent(data.content);

        document.title = `Editing post ${String(data.id)} - ${data.title}`;
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json(); // New post object or an error message

      if (res.status === 500) {
        throw new Error(`Error ${res.status} - ${data.error} - ${data.message}`);
      }

      if (res.status !== 200) {
        throw new Error(`Error ${res.status} - ${data.message}`);
      }

      const newId = data.id;
      window.alert(`Post ${newId} updated all right`);

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
            onChange={(e) => setTitle(e.target.value.trim())}
            required
          />
        </div>
        <div style={{ margin: "10px" }}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value.trim())}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UpdatePostPage;
