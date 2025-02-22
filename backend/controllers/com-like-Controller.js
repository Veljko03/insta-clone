const db = require("../db/likes-comments-queries");

//LIKES

const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  if (!userId || !postId) {
    res.status(400).json({ message: "somtehing missing" });
  }

  const result = await db.likePost(postId, userId);

  res.json(result);
};

const fetchNumOfPostLikes = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    res.status(400).json({ message: "somtehing missing" });
  }

  const result = await db.getNumOfPostLikes(postId);

  res.json(result);
};

const likeComment = async (req, res) => {
  const { commentId, userId } = req.body;
  if (!userId || !commentId) {
    res.status(400).json({ message: "somtehing missing" });
  }
  console.log("prosao dovde");

  const result = await db.likeComment(commentId, userId);

  res.json(result);
};

const fetchNumOfCommentLikes = async (req, res) => {
  const commentId = req.params.id;
  if (!commentId) {
    res.status(400).json({ message: "somtehing missing" });
  }

  const result = await db.getNumOfCommentLikes(commentId);

  res.json(result);
};

//COMMENTS
const createNewComment = async (req, res) => {
  const { content, userId, postId } = req.body;
  if (!content || !userId || !postId) {
    res.status(400).json({ message: "somtehing missing" });
    return;
  }
  const newComment = await db.createNewComment(content, userId, postId);
  res.json(newComment);
};

const fetchAllCommentsInPost = async (req, res) => {
  const postId = req.params.id;
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
  likePost,
  fetchNumOfPostLikes,
  likeComment,
  fetchNumOfCommentLikes,
};
