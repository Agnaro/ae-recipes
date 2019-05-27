const fs = require("fs");
const path = require("path");

var keys = {};

if (process.env.NODE_ENV === "production") {
  const private_key = fs.readFileSync(
    path.resolve(__dirname, "private.key"),
    "utf8"
  );
  const register_key = fs.readFileSync(
    path.resolve(__dirname, "register.key"),
    "utf8"
  );
  const db_key = fs.readFileSync(path.resolve(__dirname, "db.key"), "utf8");

  keys = {
    mongoURI: db_key,
    secret: private_key,
    registerKey: register_key
  };
} else {
  keys = {
    mongoURI: "mongodb://ecr:ecr1234@ds249035.mlab.com:49035/heroku_q9bf5k2b",
    secret: "yoursecret",
    registerKey: "needthiskey"
  };
}

module.exports = keys;
