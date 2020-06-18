module.exports = (req,res,next) => {
  if(!req.user) {
    res.send({err:"no user detected"});
  } else {
    next();
  }
}