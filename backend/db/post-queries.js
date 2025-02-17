const pool = require("./pool");

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id) => {
  const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return user.rowCount;
};

const createNewPost = async (constent, userID, photo) => {
  const result = await pool.query(
    "INSERT INTO posts (content,user_id,post_image) VALUES ($1,$2,$3) RETURNING *",
    [constent, userID, photo]
  );
  return result.rows[0];
};

const getAllPosts = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};

const getPostById = async (postId) => {
  const post = await pool.query("SELECT * FROM posts WHERE id =$1", [postId]);
  return post.rows[0];
};
const deletePostById = async (postId, userId) => {
  console.log(postId, " postid ", userId);

  const post = await pool.query(
    "DELETE FROM posts WHERE id=$1 AND user_id=$2 RETURNING *",
    [postId, userId]
  );
  return post.rows[0];
};

module.exports = {
  getUsers,
  createNewPost,
  getUserById,
  getAllPosts,
  getPostById,
  deletePostById,
};
