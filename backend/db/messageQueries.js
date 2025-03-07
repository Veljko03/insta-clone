const pool = require("./pool");

const sendMessage = async (content, sender, reciever) => {
  const result = await pool.query(
    "INSERT INTO messages (content,sender_id,receiver_id) VALUES ($1,$2,$3) RETURNING *",
    [content, sender, reciever]
  );

  return result.rows[0];
};

module.exports = { sendMessage };
