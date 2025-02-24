import { useEffect, useState } from "react";
import "./pages.css";
import { useOutletContext } from "react-router-dom";
import Post from "../components/Post";

const LikesPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, user] = useOutletContext();

  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;

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
  }, []);

  console.log(posts);
  const handleLikePost = (e) => {
    e.preventDefault();
    alert("Radi isto");
  };

  if (posts.length < 1) return;
  return (
    <div className="homeContainer">
      <div className="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            content={post.content}
            numComments={post.comments}
            numLikes={post.likes}
            img={post.post_image}
            creator={post.username}
            handleClick={handleLikePost}
          />
        ))}
      </div>
    </div>
  );
};

export default LikesPage;
