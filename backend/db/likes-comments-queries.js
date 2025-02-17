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
  //const likes = await pool.query()
};

module.exports = { likePost, likeComment };
