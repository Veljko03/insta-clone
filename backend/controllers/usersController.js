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

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;
  const isFollowing = await db.searchfollowUser(followerId, followingId);
  if (isFollowing == 0) {
    const follow = await db.followUser(followerId, followingId);
    res.json("followed");
  } else {
    const unfollow = await db.unfollowUser(followerId, followingId);
    res.json("unfollowed");
  }
};
const isFollowing = async (req, res) => {
  const { followerId, followingId } = req.body;
  const isFollowing = await db.searchfollowUser(followerId, followingId);
  res.json(isFollowing);
};

const setProfilePic = async (req, res) => {
  const { photo, userId } = req.body;
  if (!photo) return;
  const userUpdated = await db.updateProfilePic(photo, userId);
  res.json(userUpdated);
};

module.exports = {
  getAllUsers,
  searchUsers,
  fetchUserProgile,
  followUser,
  isFollowing,
  setProfilePic,
};
