const db = require("../db/queries");

const createNewPost = async (req, res) => {
  try {
    const { content, userID, photo } = req.body;
    const user = await db.getUserById(userID);
    if (!user) {
      res.status(400).json({ message: "No user" });
    }
    const post = await db.createNewPost(content, userID, photo);
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
  if (!post) {
    res.status(400).json({ message: "This post does not exists" });
  } else {
    res.json(post);
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

module.exports = {
  createNewPost,
  fetchAllPosts,
  fetchPostById,
  deletePostById,
};
