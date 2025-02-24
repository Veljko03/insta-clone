const pool = require("./pool");

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id) => {
  const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
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
module.exports = { getUsers, getUserById, getUserByEmail, getUserByString };
