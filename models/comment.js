const mongoose = require("mongoose");
const {Schema} = mongoose;
const commentSchema = new Schema({
  postId:String,
  userEmail:String,
  userName:String,
  userId:String,
  userPhoto:String,
  content:String,
  createAt:Date,
});

mongoose.model("comments",commentSchema);