const db = require("../db/post-queries");

const getAllUsers = async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
};

const followUser = async (req, res) => {};

module.exports = { getAllUsers };
