const mongoose = require("mongoose");
const keys = require("../config/keys");
const AWS = require("aws-sdk");
const Post = mongoose.model("posts");
const requireLogin = require("../middlewares/requireLogin");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId:keys.AWSKeyId,
  secretAccessKey:keys.AWSSecretKey,
  region:keys.Region,
})

module.exports = (app) => {
  app.get("/api/image/upload", requireLogin, async (req,res) => {

    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket:keys.Bucket,
        ContentType:"image/*",
        Key:key
      },
      (err,url)=>res.send({ key, err, url })
    );
  });

  app.post("/api/post/create", requireLogin, async (req,res) => {
    
    await Post({
      userEmail:req.user.email,
      userName:req.user.username,
      userId:req.user.id,
      userPhoto:req.user.image,
      title:req.body.title,
      content:req.body.content,
      image:req.body.key,
      createAt: new Date(),
    }).save();
    res.send({});
  });

  app.post("/api/post/delete/:id", requireLogin, async (req,res) => {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.send({});
  });
   
  app.get("/api/post/user/get", requireLogin, async (req, res)=>{
    const posts = await Post.find();
    const currentUser = req.user.id;
    const userPosts = posts.filter(post => {
      return post.userId === currentUser;
    });
    
    res.send(userPosts);
  });

  app.get("/api/post/all/get", async (req,res)=>{
    const posts = await Post.find();
    res.send(posts);
  });
}