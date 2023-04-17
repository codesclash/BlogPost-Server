const express = require("express");
const router = express.Router();
let Post = require("../models/post.model");

//View All POST (no comments----)
router.get("/", (req, res) => {
  Post.find({}, { comments: 0 })
    .then((newPosts) => res.status(200).json(newPosts))
    .catch((err) => res.status(400).json({ error: err }));
});

//View One Particular post (with comments-------)
router.get("/:postId", (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json({ error: err }));
});

//Add a new post
router.post("/add", (req, res) => {
  const title = req.body.title;
  const imgLink = req.body.imgLink;
  const content = req.body.content;
  const author = req.body.author;
  const datePublished = new Date();
  const comments = [];

  const newPost = new Post({
    title,
    imgLink,
    content,
    author,
    datePublished,
    comments,
  });

  newPost
    .save()
    .then(() => res.status(200).send("Post Added Successfully!"))
    .catch((err) => res.status(400).json({ error: err }));
});

//Delete a post
router.delete("/delete/:postId", (req, res) => {
  const postId = req.params.postId;
  Post.findByIdAndDelete(postId)
    .then(() =>
      res
        .status(200)
        .json({ postId: postId, message: "Post Deleted Successfully!" })
    )
    .catch((err) => res.status(400).json({ error: err }));
});

//Update a post
router.post("/update/:postId", (req, res) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const imgLink = req.body.imgLink;
  const content = req.body.content;
  const authorName = req.body.author;
  const datePublished = new Date();

  Post.findOneAndUpdate(
    { _id: postId },
    {
      $set: {
        title: title,
        imgLink: imgLink,
        content: content,
        author: authorName,
        datePublished: datePublished,
      },
    }
  )
    .then(() => res.status(200).send("Post Updated Successfully!"))
    .catch((err) => res.status(400).json({ error: err }));
});

//Add a comment to a post
router.post("/:postId/addcomment", (req, res) => {
  const postId = req.params.postId;
  const newComment = {
    name: req.body.name,
    comment: req.body.comment,
    date: new Date(),
  };
  // Find the post with the specified ID and update its comments array
  Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment } })
    .then(() => Post.findById(postId))
    .then((postComments) => {
      const newComment =
        postComments.comments[postComments.comments.length - 1];
      return res
        .status(200)
        .json({
          message: "Comment Added Successfully!",
          newComment: newComment,
        });
    })
    .catch((err) => res.status(400).json({ error: err }));
});

//View all comments of a post
router.get("/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  Post.find({ _id: postId }, { comments: 1 })
    .then((postComments) => res.status(200).json(postComments))
    .catch((err) => res.status(400).json({ error: err }));
});

//Delete a comment from a post
router.delete("/:postId/deletecomment/:commentId", (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  Post.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: commentId } } }
  )
    .then(
      res
        .status(200)
        .json({
          message: "Comment Deleted Successfully!",
          commentId: commentId,
        })
    )
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
