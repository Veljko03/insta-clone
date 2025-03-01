const db = require("../db/usersQueries");

const getAllUsers = async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
};

const searchUsers = async (req, res) => {
  const { findText } = req.body;
  try {
    const users = await db.getUserByString(findText);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const fetchUserProgile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await db.getUserProfile(id);
    res.json(profile);
  } catch (error) {
    console.log(error);
  }
};
const followUser = async (req, res) => {};

module.exports = { getAllUsers, searchUsers, fetchUserProgile };
