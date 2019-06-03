//var config = require("../../config/keys");
//var jwt = require("jsonwebtoken");
//const passport = require("passport");

// Bring in Models
//let User = require("../../models/User");
import { User } from "../models/User.js";

export default class userService {
  findUser = id => {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };

  Signup(user) {
    return new Promise((resolve, reject) => {
      var newUser = new User({
        username: user.username,
        password: user.password
      });
      newUser.save(function(err) {
        if (err) {
          reject({ status: 400, msg: "Username already exists." });
        } else {
          resolve({ msg: "Created new user." });
        }
      });
    });
  }
}
