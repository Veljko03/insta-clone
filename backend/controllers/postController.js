const db = require("../db/post-queries");
const userDb = require("../db/usersQueries");

const createNewPost = async (req, res) => {
  try {
    const { content, userID, photo } = req.body;

    const user = await userDb.getUserById(userID);
    if (!user) {
      res.status(400).json({ message: "No user" });
      return;
    }
    const post = await db.createNewPost(content, userID, photo);
    console.log(post);

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: "somtehing missing" });
  }
};

const fetchAllPosts = async (req, res) => {
  const posts = await db.getAllPosts();
  res.json(posts);
};

const fetchPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await db.getPostById(postId);
  const postComments = await db.getPostComments(postId);
  if (!post) {
    res.status(400).json({ message: "This post does not exists" });
  } else {
    res.json({ ...post, postComments });
  }
};

const deletePostById = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const deletedPost = await db.deletePostById(postId, userId);
    console.log("prosao");

    res.json(deletedPost);
  } catch (error) {
    res.status(400).json({ message: "somtehing missing" });
  }
};

const fetchLikedPosts = async (req, res) => {
  const { userID } = req.body;
  try {
    const posts = await db.getLikedPosts(userID);
    console.log(posts);

    res.json(posts);
  } catch (error) {
    res
      .status(400)
      .json({ message: "somtehing went wrhong fetchhng liked posts" });
  }
};

module.exports = {
  createNewPost,
  fetchAllPosts,
  fetchPostById,
  deletePostById,
  fetchLikedPosts,
};
