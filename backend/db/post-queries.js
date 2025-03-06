const pool = require("./pool");

const createNewPost = async (constent, userID, photo) => {
  const result = await pool.query(
    "INSERT INTO posts (content,user_id,post_image) VALUES ($1,$2,$3) RETURNING *",
    [constent, userID, photo]
  );
  return result.rows[0];
};

const getAllPosts = async () => {
  const result = await pool.query(
    "SELECT p.*,u.username,COUNT(DISTINCT c.id) as comments,COUNT(DISTINCT l.id) as likes FROM posts p INNER JOIN users u on p.user_id=u.id LEFT JOIN comments c on p.id=c.post_id LEFT JOIN post_likes l on p.id=l.post_id GROUP BY p.id,u.username ORDER BY p.created_at desc"
  );
  return result.rows;
};

const getPostById = async (postId) => {
  const post = await pool.query(
    "SELECT p.* ,u.username,u.id,COUNT(l.id) as likes  FROM posts p  LEFT JOIN post_likes l on p.id=l.post_id INNER JOIN users u on p.user_id=u.id  WHERE p.id =$1 GROUP BY p.id,u.username,u.id ",
    [postId]
  );
  return post.rows[0];
};
const getPostComments = async (postId) => {
  const postComments = await pool.query(
    "SELECT c.* ,u.username,u.id as userID , u.profile_image, COUNT(l.id) as likes FROM comments c INNER JOIN users u on c.user_id= u.id LEFT JOIN comment_likes l on c.id = l.comment_id WHERE c.post_id = $1 GROUP BY c.id,u.id ORDER BY c.created_at desc",
    [postId]
  );
  return postComments.rows;
};
const deletePostById = async (postId, userId) => {
  const post = await pool.query(
    "DELETE FROM posts WHERE id=$1 AND user_id=$2 RETURNING *",
    [postId, userId]
  );
  return post.rows[0];
};

const getLikedPosts = async (userID) => {
  console.log("usao");

  const posts = await pool.query(
    "SELECT p.*, u.username, COUNT(DISTINCT c.id) AS comments, (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) AS likes FROM posts p INNER JOIN post_likes pl ON p.id = pl.post_id INNER JOIN users u ON p.user_id = u.id LEFT JOIN comments c ON p.id = c.post_id WHERE pl.user_id = $1 GROUP BY p.id, u.username ORDER BY p.created_at desc",
    [userID]
  );

  return posts.rows;
};

const getPostsByUserId = async (userId) => {
  const posts = await pool.query(
    `SELECT p.*,u.username,COUNT(DISTINCT c.id) as comments,COUNT(DISTINCT l.id) as likes FROM posts p INNER JOIN users u on p.user_id=u.id LEFT JOIN comments c on p.id=c.post_id LEFT JOIN post_likes l on p.id=l.post_id WHERE p.user_id=$1 GROUP BY p.id,u.username `,
    [userId]
  );
  return posts.rows;
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
  getLikedPosts,
  getPostComments,
  getPostsByUserId,
};
