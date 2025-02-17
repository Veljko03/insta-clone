const db = require("../db/likes-comments-queries");

const createNewComment = async (req, res) => {
  const { content, userId, postId } = req.body;
  if (!content || !userId || !postId) {
    res.status(400).json({ message: "somtehing missing" });
  }
  const newComment = await db.createNewComment(content, userId, postId);
  res.json(newComment);
};

const fetchAllCommentsInPost = async (req, res) => {
  const { postId } = req.body;
  const comments = await db.getAllComments(postId);
  res.json(comments);
};

const deleteCommentFormPost = async (req, res) => {
  const { commentId, postId, userId } = req.body;
  if (!commentId || !userId || !postId) {
    res.status(400).json({ message: "somtehing missing" });
  }
  const comment = await db.deleteCommentById(postId, commentId, userId);
  res.json(comment);
};
module.exports = {
  createNewComment,
  fetchAllCommentsInPost,
  deleteCommentFormPost,
};
