const pool = require("./pool");

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

const createNewUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

module.exports = { getUserByEmail, createNewUser };
