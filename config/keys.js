const fs = require("fs");

var keys = {};

if (process.env.NODE_ENV === "production") {
  const private_key = fs.readFileSync("../private.key");
  const register_key = fs.readFileSync("../register.key");
  const db_key = fs.readFileSync("../db.key");

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
