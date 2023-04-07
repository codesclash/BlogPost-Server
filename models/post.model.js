const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String },
  comment: { type: String },
  date: { type: Date }
});

const postSchema = new mongoose.Schema({
  title: { type: String },
  imgLink: { type: String },
  content: { type: String },
  author: { type: String },
  datePublished: { type: Date },
  comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;