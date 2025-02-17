const express = require("express");
const {
  createNewPost,
  fetchAllPosts,
  fetchPostById,
  deletePostById,
} = require("../controllers/postController");
const {
  createNewComment,
  fetchAllCommentsInPost,
  deleteCommentFormPost,
} = require("../controllers/com-like-Controller");
const router = express.Router();

router.post("/post", createNewPost);

router.get("/post", fetchAllPosts);

router.get("/post/:id", fetchPostById);

router.delete("/post/:id", deletePostById);

//COMMENTS

router.post("/comment", createNewComment);
router.get("/comment", fetchAllCommentsInPost);
router.delete("/comment", deleteCommentFormPost);

module.exports = router;
