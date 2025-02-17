const express = require("express");
const {
  createNewPost,
  fetchAllPosts,
  fetchPostById,
  deletePostById,
} = require("../controllers/postController");
const router = express.Router();

router.post("/post", createNewPost);

router.get("/post", fetchAllPosts);

router.get("/post/:id", fetchPostById);

router.delete("/post/:id", deletePostById);

module.exports = router;
