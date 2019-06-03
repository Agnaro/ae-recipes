import User from "../models/User.js";
import jwt from "jsonwebtoken";
import * as config from "../config/keys.js";

export default class userService {
  Signup(userDTO) {
    return new Promise((resolve, reject) => {
      var newUser = new User({
        username: userDTO.username,
        password: userDTO.password
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

  Login(userDTO) {
    return new Promise((resolve, reject) => {
      this.findUserByName(userDTO.username)
        .then(userModel => this.checkPassword(userModel, userDTO.password))
        .then(confirmedUser => this.formatUser(confirmedUser))
        .then(formattedUser => this.createToken(formattedUser))
        .then(token => resolve(token))
        .catch(err => reject(err));
    });
  }

  returnUserInfo(id) {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then(user => resolve({ user: { id: user._id, name: user.username } }))
        .catch(err => reject({ status: 401, msg: "User not found." }));
    });
  }

  findUserByName(username) {
    return new Promise((resolve, reject) => {
      User.findOne({ username: username })
        .then(user => resolve(user))
        .catch(err => reject({ status: 401, msg: "User not found." }));
    });
  }

  checkPassword(userModel, passwordToCheck) {
    return new Promise((resolve, reject) => {
      userModel.comparePassword(passwordToCheck, function(err, isMatch) {
        if (err && !isMatch) {
          reject({ status: 401, msg: "Incorrect password." });
        } else {
          resolve(userModel);
        }
      });
    });
  }

  formatUser(userModel) {
    return new Promise((resolve, reject) => {
      resolve({ sub: userModel._id, name: userModel.username });
    });
  }

  createToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(JSON.stringify(payload), config.secret, (err, token) => {
        if (err) {
          reject({ status: 500, msg: "Internal Service Error" });
        } else {
          const userInfo = { id: payload.sub, token: token };
          resolve(userInfo);
        }
      });
    });
  }
}
