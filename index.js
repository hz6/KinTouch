const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

const {json}=require("body-parser");
app.use(json());

mongoose.connect(
  keys.mongoURI,
  {
    useUnifiedTopology:true,
    useNewUrlParser:true
  }
);

app.use(
  cookieSession({
    maxAge:1000*60*30,
    keys:[keys.cookieKeys]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./models/user");
require("./models/post");
require("./models/comment");

require("./services/passport");

require("./routes/authRoutes")(app);
require("./routes/postRoutes")(app)
require("./routes/commentRoutes")(app);

// Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`Listening to port ${port}`));