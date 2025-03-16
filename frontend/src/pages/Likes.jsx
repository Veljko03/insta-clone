import { useEffect, useState } from "react";
import "./pages.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import Post from "../components/Post";

const LikesPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, user] = useOutletContext();
  const [rerender, setRerender] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) return;
    const userID = user.id;
    console.log(userID);

    fetch(`${API_URL}/liked-posts`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userID: userID }),
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
  };

  if (posts.length < 1) {
    return (
      <div className="homeContainer">
        <h1>There is no liked posts...</h1>
        <h3>When you like some post it will appear here</h3>
      </div>
    );
  }
  return (
    <div className="homeContainer">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
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

export default LikesPage;
