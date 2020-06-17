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

require("./services/passport");

require("./routes/authRoutes")(app);
// require("./routes/postRoutes")(app)

app.listen(4000,()=>console.log('Listeing to port 4000'));