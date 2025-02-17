const db = require("../db/queries");

const getAllUsers = async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
};

module.exports = { getAllUsers };
