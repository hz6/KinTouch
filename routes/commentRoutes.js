const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {

  app.post("/api/comment/create", requireLogin, async (req, res) => {
    await new Comment({
      postId: req.body.postId,
      userEmail: req.user.email,
      userName: req.user.username,
      userId: req.user.id,
      userPhoto: req.user.image,
      content: req.body.content,
      createAt: new Date(),
    }).save();
    res.send({})
  });

  app.delete("/api/comment/:id", async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.get("/api/comment/get/:id", async (req, res) => {
    const comments = await Comment.find({ postId: req.params.id });
    res.send(comments);
  });
}