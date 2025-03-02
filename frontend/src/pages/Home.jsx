import { useEffect, useState } from "react";
import Post from "../components/Post";
import "./pages.css";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, user] = useOutletContext();
  const [rerender, setRerender] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

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
  }, [rerender]);

  const handleLikePost = (postId, event) => {
    event.stopPropagation();

    if (!token || !postId || !user) return;
    const userID = user.id;

    fetch(`${API_URL}/post/like`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userID, postId: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRerender((prev) => !prev);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  if (!posts) return <p>Loading...</p>;
  console.log(posts);
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
            user={user}
            post={post}
            handleClick={handleLikePost}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
