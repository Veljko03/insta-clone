const pool = require("./pool");

const sendMessage = async (content, sender, reciever) => {
  const result = await pool.query(
    "INSERT INTO messages (content,sender_id,receiver_id) VALUES ($1,$2,$3) RETURNING *",
    [content, sender, reciever]
  );

  return result.rows[0];
};

const getMessagesById = async (id) => {
  const result = await pool.query(
    `SELECT 
    m.id AS message_id,
    m.content,
    m.created_at,
    m.sender_id,
    m.receiver_id,
    sender.username AS sender_name,
    sender.profile_image AS sender_image,
    receiver.username AS receiver_name,
    receiver.profile_image AS receiver_image
FROM 
    messages m
INNER JOIN 
    users sender ON m.sender_id = sender.id
INNER JOIN 
    users receiver ON m.receiver_id = receiver.id
WHERE 
    m.id=$1
ORDER BY 
    m.created_at ASC;
`,
    [id]
  );

  return result.rows[0];
};

const userMessages = async (userId) => {
  const result = await pool.query(
    `SELECT 
    m.id AS message_id,
    m.content,
    m.created_at,
    m.sender_id,
    m.receiver_id,
    CASE 
        WHEN m.sender_id = $1 THEN m.receiver_id 
        ELSE m.sender_id 
    END AS other_user_id,
    u.username AS other_user_username,
    u.profile_image AS other_user_profile_image
FROM messages m
INNER JOIN users u ON 
    (m.sender_id = u.id OR m.receiver_id = u.id)
WHERE (m.sender_id = $1 OR m.receiver_id = $1)
  AND (
    (m.sender_id = $1 AND m.receiver_id != $1) OR 
    (m.receiver_id = $1 AND m.sender_id != $1)
  )
ORDER BY m.created_at DESC

`,
    [userId]
  );

  return result.rows;
};

const getMessages = async (sender, reciever) => {
  const result = await pool.query(
    `SELECT 
    m.id AS message_id,
    m.content,
    m.created_at,
    m.sender_id,
    m.receiver_id,
    sender.username AS sender_name,
    sender.profile_image AS sender_image,
    receiver.username AS receiver_name,
    receiver.profile_image AS receiver_image
FROM 
    messages m
INNER JOIN 
    users sender ON m.sender_id = sender.id
INNER JOIN 
    users receiver ON m.receiver_id = receiver.id
WHERE 
    (m.sender_id = $1 AND m.receiver_id = $2) 
    OR 
    (m.sender_id = $2 AND m.receiver_id = $1)
ORDER BY 
    m.created_at ASC;
`,
    [sender, reciever]
  );

  return result.rows;
};

module.exports = { sendMessage, getMessages, getMessagesById, userMessages };
