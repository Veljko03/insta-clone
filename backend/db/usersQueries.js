const pool = require("./pool");

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id) => {
  const user = await pool.query("SELECT * FROM users WHERE id=$1 ", [id]);
  return user.rowCount;
};

const getUserByString = async (str) => {
  const users = await pool.query(
    "SELECT * FROM users WHERE username ILIKE $1",
    [`%${str}%`]
  );

  return users.rows;
};
const getUserByEmail = async (email) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    return user.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      u.id, 
      u.username, 
      u.profile_image, 
      u.biography, 
      u.email,
      COUNT(DISTINCT f1.follower) AS followers, 
      COUNT(DISTINCT f2.following) AS following
    FROM users u
    LEFT JOIN follows f1 ON u.id = f1.following
    LEFT JOIN follows f2 ON u.id = f2.follower
    WHERE u.id = $1
    GROUP BY u.id, u.username, u.profile_image, u.biography, u.email;
    `,
    [userId]
  );

  return result.rows[0];
};
module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByString,
  getUserProfile,
};
