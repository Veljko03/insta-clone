const express = require("express");
const passport = require("passport");
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
  likePost,
  fetchNumOfPostLikes,
  likeComment,
  fetchNumOfCommentLikes,
} = require("../controllers/com-like-Controller");
const router = express.Router();

router.post("/post", createNewPost);

router.get(
  "/post",
  passport.authenticate("jwt", { session: false }),
  fetchAllPosts
);

router.get("/post/:id", fetchPostById);

router.delete("/post/:id", deletePostById);

//LIKE-post

router.post("/post/like", likePost);

router.get("/post/:id/like", fetchNumOfPostLikes);

//COMMENTS

router.post("/comment", createNewComment);
router.get("/post/:id/comments", fetchAllCommentsInPost);
router.delete("/comment", deleteCommentFormPost);

router.post("/comment/like", likeComment);
router.get("/comment/:id/like", fetchNumOfCommentLikes);

module.exports = router;
