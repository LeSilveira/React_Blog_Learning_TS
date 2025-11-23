import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post, reqError } from "../types";

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");

        if (res.status !== 200) {
          const data = (await res.json()) as reqError;

          if (res.status === 500) {
            throw new Error(
              `Error ${res.status} - ${data.error} - ${data.message}`
            );
          }

          throw new Error(`Error ${res.status} - ${data.message}`);
        }

        const data = (await res.json()) as Post[];

        setPosts(data);
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ul>
      {posts.length === 0 ? (
        <h3>{`No post has been made yet, come back later or create one :)`}</h3>
      ) : (
        posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}> {post.title} </Link>
          </li>
        ))
      )}
    </ul>
  );
}

export default PostsPage;
