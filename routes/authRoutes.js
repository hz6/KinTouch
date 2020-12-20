const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate(
      "google",
      {
        scope: ["profile", "email"]
      }
    )
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000/");
      // res.redirect("/");
    }
  );

  app.get(
    "/auth/current-user",
    (req, res) => {
      console.log("CURRENT USER:", req.user);
      res.send(req.user);
    }
  );

  app.get(
    "/auth/logout",
    (req, res) => {
      req.logout();
      res.redirect("http://localhost:3000/");
      // res.redirect("/");
    }
  )
}