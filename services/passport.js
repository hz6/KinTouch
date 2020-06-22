const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const userData = mongoose.model("users");

passport.serializeUser((user,callback)=>{
  callback(null, user.id);
});

passport.deserializeUser(async (id,callback)=>{
  const user = await userData.findById(id);
  callback(null, user);
})

passport.use(
  new GoogleStrategy(
  {
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:"/auth/google/callback",
  },
  // 这个 callback 函数作用于google-strategy
  async (accessToken, refreshToken, profile, callback)=>{
    try{
      console.log("accessToken:",accessToken);
      console.log("refreshToken:",refreshToken);
      console.log("profile:",profile);
      const document = await userData.findOne({googleId: profile.id});
      if (document) {
        return callback(null,document);
      } else {
        const user = await new userData({
          googleId:profile.id,
          username:profile.displayName,
          email:profile.emails[0].value,
          image:profile.photos[0].value,
        }).save();
      }
    } catch(error) {
      console.log(error);
    }
  })
);