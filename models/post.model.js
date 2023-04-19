const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String,required: true,minlength: 2 },
  comment: { type: String,required: true,minlength: 7 },
  date: { type: Date }
});

const postSchema = new mongoose.Schema({
  title: { type: String , required: true,minlength:4 },
  imgLink: { type: String, required: true,minlength: 9 },
  content: { type: String, required: true,minlength: 11},
  author: { type: String,required: true,minlength:5 },
  datePublished: { type: Date },
  comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;