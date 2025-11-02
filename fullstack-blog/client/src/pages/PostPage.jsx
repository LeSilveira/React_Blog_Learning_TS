import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const deletePost = async () => {
    if (
      window.confirm(
        `R u certain u want to forever remove the post ${post.id} - ${post.title}?`
      )
    ) {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.status === 500) {
          throw new Error(
            `Error ${res.status} - ${data.error} - ${data.message}`
          );
        }

        if (res.status !== 204) {
          throw new Error(`Error ${res.status} - ${data.message}`);
        }

        window.alert(`Post ${post.id} - ${post.title} deleted all right`);

        navigate("/posts");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);

        const data = await res.json();

        if (res.status === 500) {
          throw new Error(
            `Error ${res.status} - $${data.error} - ${data.message}`
          );
        }

        if (res.status !== 200) {
          throw new Error(`Error ${res.status} - ${data.message}`);
        }

        setPost(data);
        document.title = `Post ${String(data.id)} - ${data.title}`;
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
    })();
  }, [id]);

  if (!post) {
    return <h1>Loading post...</h1>;
  }

  if (Object.keys(post).length === 0) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <div>
        <p>
          Just a post with the {post.id} id and title {post.title}
        </p>
        <h3> {post.content} </h3>
        <button onClick={deletePost}>Delete Post</button>
        <button onClick={() => navigate(`/posts/update/${post.id}`)}>
          Update Post
        </button>
      </div>
    </>
  );
}

export default PostPage;
