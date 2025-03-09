import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import "./pages.css";
const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [token, user] = useOutletContext();
  const params = useParams();
  const [content, setContent] = useState("");
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  console.log("id od usera", user.id);

  useEffect(() => {
    if (!token) return;
    const id = params.id;
    console.log("id od posta", id);

    fetch(`${API_URL}/post/${id}`, {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => console.log(error));
  }, [rerender]);

  const handleLikePost = (postId, event) => {
    event.stopPropagation();
    if (!postId) console.log("nema post id");

    if (!token || !user) return;
    const userID = user.id;
    console.log("ovo je post id ", postId);

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

  const handleAddComment = (e) => {
    e.preventDefault();
    if (content == "") {
      alert("Please type something first");
    }
    const userId = user.id;
    const postId = post.id;
    const toSend = { content, userId, postId };
    fetch(`${API_URL}/comment`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setRerender((prev) => !prev);
          setContent("");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const likeComment = (id) => {
    if (!user) return;
    const userId = user.id;
    const commentId = id;
    const toSend = { commentId, userId };
    fetch(`${API_URL}/comment/like`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setRerender((prev) => !prev);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const openUserById = (event) => {
    event.stopPropagation();
    if (user.id == post.user_id) {
      navigate("/view-profile");
    } else {
      navigate(`/user/${post.user_id}`);
    }
  };
  if (!post) return <p>Loading...</p>;
  console.log(post);

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="homeContainer">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      <Post post={post} user={user} handleClick={handleLikePost} />
      <div className="addComment">
        <form className="commentForm" onSubmit={handleAddComment} action="">
          <input
            type="text"
            required
            minLength={1}
            value={content}
            placeholder="Type a comment..."
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className="comments">
        <h1>View comments ({post.postComments.length})</h1>
        {post.postComments.map((comment) => (
          <div key={comment.id} className="comm">
            <div className="comUser">
              <p>IMG</p>
              <p className="userLink" onClick={openUserById}>
                {comment.username}
              </p>
              <span className="time">{timeAgo(comment.created_at)}</span>
            </div>
            <p>{comment.content}</p>
            <button onClick={() => likeComment(comment.id)}>
              {comment.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
