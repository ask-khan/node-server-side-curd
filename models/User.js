const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create A Schema
var userSchema = new Schema({
  fname: String,
  lname: String,
  username: String,
  password: String,
  email: String
});

// Create Model.
var User = mongoose.model('User', userSchema);

module.exports = User;