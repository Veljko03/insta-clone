const express = require("express");
const passport = require("passport");
const {
  createNewPost,
  fetchAllPosts,
  fetchPostById,
  deletePostById,
  fetchLikedPosts,
  fetchPostsByUserId,
  fetcgUsersChat,
  fetchPostsFromFollowers,
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

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  createNewPost
);

router.post(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  fetchPostsFromFollowers
);

router.get(
  "/post",
  passport.authenticate("jwt", { session: false }),
  fetchAllPosts
);

router.get("/post/:id", fetchPostById);

router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  deletePostById
);

//LIKE-post

router.post(
  "/post/like",
  passport.authenticate("jwt", { session: false }),
  likePost
);

router.get(
  "/post/:id/like",
  passport.authenticate("jwt", { session: false }),
  fetchNumOfPostLikes
);

//COMMENTS

router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  createNewComment
);
router.get(
  "/post/:id/comments",
  passport.authenticate("jwt", { session: false }),
  fetchAllCommentsInPost
);
router.delete(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  deleteCommentFormPost
);

router.post(
  "/comment/like",
  passport.authenticate("jwt", { session: false }),
  likeComment
);
router.get(
  "/comment/:id/like",
  passport.authenticate("jwt", { session: false }),
  fetchNumOfCommentLikes
);

router.post(
  "/liked-posts",
  passport.authenticate("jwt", { session: false }),
  fetchLikedPosts
);

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  fetchPostsByUserId
);
router.get("/", (req, res) => {});
router.get(
  "/chat/:id",
  passport.authenticate("jwt", { session: false }),
  fetcgUsersChat
);

module.exports = router;
