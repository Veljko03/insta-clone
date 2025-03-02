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
  return (
    <div onClick={openPost} className="post">
      <div className="postTop">
        <p>P</p>
        <p>aa</p>
        <p>vreme</p>
        <p onClick={openUserById}>{post.username}</p>
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
