const mongoose = require("mongoose");
const keys = require("../config/keys");
const AWS = require("aws-sdk");
const Post = mongoose.model("posts");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId:keys.AWSKeyId,
  secretAccessKey:keys.AWSSecretKey,
  region:keys.Region,
})

module.exports = (app) => {
  app.get("/api/image/upload", async (req,res) => {
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
  })
}