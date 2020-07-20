const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = () => {
  return new User({
    googleId: "162346479217619380",
    username: "Anthony Zhang"
  }).save();
}