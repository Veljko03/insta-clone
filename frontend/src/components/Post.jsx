import "./components.css";
import { useNavigate } from "react-router-dom";

const Post = ({ post, handleClick, user }) => {
  const navigate = useNavigate();
  const openPost = () => {
    const id = post.id;
    navigate(`/post/${id}`);
  };

  const openUserById = (event) => {
    event.stopPropagation();
    if (user.id == post.user_id) {
      navigate("/view-profile");
    } else {
      navigate(`/user/${post.user_id}`);
    }
  };
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

  const time = timeAgo(post.created_at);

  return (
    <div onClick={openPost} className="post">
      <div className="postTop">
        <p>P</p>

        <p className="userLink" onClick={openUserById}>
          {post.username}
        </p>
        <p className="time">{time}</p>
      </div>
      <div className="postContent">
        <p>{post.content}</p>
      </div>
      <div className="postLike">
        <button onClick={(e) => handleClick(post.id, e)}>{post.likes}</button>
        <p>Comment {post.comments}</p>
      </div>
    </div>
  );
};

export default Post;
