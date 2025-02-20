import "./components.css";

const Post = ({
  img,
  username,
  createdTime,
  content,
  numLikes,
  numComments,
  creator,
}) => {
  return (
    <div className="post">
      <div className="postTop">
        <p>P</p>
        <p>{username}</p>
        <p>vreme</p>
        <p>{creator}</p>
      </div>
      <div className="postContent">
        <p>{content}</p>
      </div>
      <div className="postLike">
        <p>Like {numLikes} </p>
        <p>Comment {numComments}</p>
      </div>
    </div>
  );
};

export default Post;
