const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate(
      "google",
      {
        scope:["profile","email"]
      }
    )
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req,res)=>{
      // res.redirect("http://localhost:3000/");
      res.redirect("/");
    }
  );

  app.get(
     "/auth/current_user",
     (req,res)=>{
        console.log("auth/current_user",req.user);
        res.send(req.user);
     }
  );

  app.get(
    "/auth/logout",
    (req,res)=>{
      req.logout();
      // res.redirect("http://localhost:3000/");
      res.redirect("/");
    }
  )
}