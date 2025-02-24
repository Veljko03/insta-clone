import "./components.css";
import { useNavigate } from "react-router-dom";

const Post = ({ post, handleClick }) => {
  const navigate = useNavigate();
  const openPost = () => {
    const id = post.id;
    navigate(`/post/${id}`);
  };

  return (
    <div onClick={openPost} className="post">
      <div className="postTop">
        <p>P</p>
        <p>aa</p>
        <p>vreme</p>
        <p>{post.username}</p>
      </div>
      <div className="postContent">
        <p>{post.content}</p>
      </div>
      <div className="postLike">
        <button onClick={() => handleClick(post.id)}>{post.likes}</button>
        <p>Comment {post.comments}</p>
      </div>
    </div>
  );
};

export default Post;
