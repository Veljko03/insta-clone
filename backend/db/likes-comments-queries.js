const pool = require("./pool");

//HANDLING LIKES
const likePost = async (post_id, user_id) => {
  const check = await pool.query(
    "SELECT * FROM post_likes WHERE post_id=$1 AND user_id=$2",
    [post_id, user_id]
  );
  if (check.rowCount > 0) {
    const result = await pool.query(
      "DELETE FROM post_likes WHERE post_id=$1 AND user_id=$2 RETURNING *",
      [post_id, user_id]
    );
    console.log("Deleted like");

    return result.rows[0];
  } else {
    const result = await pool.query(
      "INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2) RETURNING *",
      [post_id, user_id]
    );
    console.log("added like");

    return result.rows[0];
  }
};

const likeComment = async (comment_id, user_id) => {
  const check = await pool.query(
    "SELECT * FROM comment_likes WHERE comment_id=$1 AND user_id=$2",
    [comment_id, user_id]
  );
  if (check.rowCount > 0) {
    const result = await pool.query(
      "DELETE FROM comment_likes WHERE comment_id=$1 AND user_id=$2 RETURNING *",
      [comment_id, user_id]
    );
    console.log("Deleted like");

    return result.rows[0];
  } else {
    const result = await pool.query(
      "INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2) RETURNING *",
      [comment_id, user_id]
    );
    console.log("added like");

    return result.rows[0];
  }
};

const fetchPostLikesById = async (postId) => {
  const likes = await pool.query("SELECT * FROM post_likes WHERE post_id=$1", [
    postId,
  ]);
  return likes.rowCount;
};

//COMMENTS
const createNewComment = async (content, userId, postId) => {
  const comment = await pool.query(
    "INSERT INTO comments (content,user_id,post_id) VALUES ($1,$2,$3) RETURNING *",
    [content, userId, postId]
  );
  return comment.rows[0];
};

const getAllComments = async (postId) => {
  const comments = await pool.query("SELECT * from comments WHERE post_id=$1", [
    postId,
  ]);
  return comments.rows;
};

const deleteCommentById = async (postId, commentId, userId) => {
  const res = await pool.query(
    "DELETE FROM comments WHERE post_id=$1 AND id=$2 AND user_id=$3 RETURNING *",
    [postId, commentId, userId]
  );
  return res.rows[0];
};
module.exports = {
  likePost,
  likeComment,
  createNewComment,
  getAllComments,
  deleteCommentById,
};
