import "./components.css";
import { useNavigate } from "react-router-dom";
import { FaCommentDots, FaHeart } from "react-icons/fa";

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
  console.log(post);

  return (
    <div onClick={openPost} className="post">
      <div className="postTop">
        <div className="ImageContainer">
          {post.profile_image ? (
            <img src={post.profile_image} alt="Profile" className="commImage" />
          ) : (
            <div className="noImageText">
              <p>No Image</p>
            </div>
          )}
        </div>
        <p className="userLink" onClick={openUserById}>
          {post.username}
        </p>
        <p className="time">{time}</p>
      </div>
      <div className="postContent">
        <p>{post.content}</p>
        {post.post_image && (
          <img
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              padding: "10px",
            }}
            src={post.post_image}
            alt="Post"
          />
        )}{" "}
      </div>
      <div className="postLike">
        <div className="sub">
          <FaHeart onClick={(e) => handleClick(post.id, e)} />
          <p>{post.likes}</p>
        </div>
        <div className="sub">
          {" "}
          <FaCommentDots />
          <p> {post.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
