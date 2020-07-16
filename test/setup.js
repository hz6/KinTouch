jest.setTimeout(1000 * 60);

require("../models/user")
const keys = require("../config/keys")
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});