const db = require("../db/post-queries");

const getAllUsers = async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
};

module.exports = { getAllUsers };
