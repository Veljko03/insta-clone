const pool = require("./pool");

const createNewUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

module.exports = { createNewUser };
