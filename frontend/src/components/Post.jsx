import "./components.css";

const Post = ({
  img,
  username,
  createdTime,
  content,
  numLikes,
  numComments,
}) => {
  return (
    <div className="post">
      <div className="postTop">
        <p>P</p>
        <p>iem</p>
        <p>prez</p>
        <p>vreme</p>
      </div>
      <div className="postContent">
        <p>ckldsafjklsadjflaks;</p>
      </div>
      <div className="postLike">
        <p>Like</p>
        <p>Comment</p>
      </div>
    </div>
  );
};

export default Post;
