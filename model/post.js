// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const postSchema = new Schema({
  title: String,
  link: String,
  date: String,
});

// the schema is useless so far
// we need to create a model using it
const Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;