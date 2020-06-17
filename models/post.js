const mongoose = require("mongoose");
const {Schema} = mongoose;
const postSchema = new Schema({
  userEmail:String,
  userName:String,
  userId:String,
  userPhoto:String,
  title:String,
  content:String,
  image: String,
});

mongoose.model("posts",postSchema);