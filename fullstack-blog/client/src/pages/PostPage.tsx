import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post, reqError } from "../types";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>({} as Post);
  const navigate = useNavigate();

  const deletePost = async () => {
    if (
      window.confirm(
        `R u certain u want to forever remove the post ${post.id} - ${post.title}?`
      )
    ) {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "DELETE",
        });

        const data = (await res.json()) as reqError;

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
        const res = await fetch(`http://localhost:3000/api/posts/${id}`);

        if (res.status !== 200) {
          const data = (await res.json()) as reqError;

          if (res.status === 500) {
            throw new Error(
              `Error ${res.status} - ${data.error} - ${data.message}`
            );
          }

          throw new Error(`Error ${res.status} - ${data.message}`);
        }

        const data = (await res.json()) as Post;
        document.title = `Post ${String(data.id)} - ${data.title}`;
        setPost(data);
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
