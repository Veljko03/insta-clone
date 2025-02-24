import { useEffect, useState } from "react";
import Post from "../components/Post";
import "./pages.css";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token] = useOutletContext();

  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  console.log(API_URL, " api url");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/post`, {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  if (!posts) return null;
  return (
    <div className="homeContainer">
      <div className="homeNav">
        <div className="n1">
          <a href="">Recent</a>
        </div>
        <div className="n2">
          <a href="">Following</a>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            content={post.content}
            numComments={post.comments}
            numLikes={post.likes}
            img={post.post_image}
            creator={post.username}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
