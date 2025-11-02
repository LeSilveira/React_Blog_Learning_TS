import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/posts");
        
        const data = await res.json();

        if (res.status === 500) {
          throw new Error(
            `Error ${res.status} - ${data.error} - ${data.message}`
          );
        }

        if (res.status !== 200) {
          throw new Error(`Error ${res.status} - ${data.message}`);
        }


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
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}> {post.title} </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostsPage;
