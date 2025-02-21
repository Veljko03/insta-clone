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
  const result = await pool.query(
    "SELECT p.id,p.content,p.post_image,p.created_at,u.username,COUNT(c.id) as comments,COUNT(l.id) as likes FROM posts p INNER JOIN users u on p.user_id=u.id LEFT JOIN comments c on p.id=c.post_id LEFT JOIN post_likes l on p.id=l.post_id GROUP BY p.id,u.username "
  );
  return result.rows;
};

const getPostById = async (postId) => {
  const post = await pool.query("SELECT * FROM posts WHERE id =$1", [postId]);
  return post.rows[0];
};
const deletePostById = async (postId, userId) => {
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
