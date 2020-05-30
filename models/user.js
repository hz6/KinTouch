const mongoose = require("mongoose");
const {Schema} = mongoose;
const dataSchema = new Schema({
  googleId:String,
  email:String,
  username:String,
  image:String
});

mongoose.model("users",dataSchema);