const express = require("express");
const router = express.Router();
var config = require("../../config/keys");
var jwt = require("jsonwebtoken");

// Bring in Models
let User = require("../../models/User");

// Register Process
router.post("/register", function(req, res) {
  const { username, password, key } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, msg: "Please pass username and password." });
  } else {
    if (key !== config.registerKey) {
      res
        .status(401)
        .json({ success: false, msg: "Invalid registration key." });
    } else {
      var newUser = new User({
        username: username,
        password: password
      });
      // save user
      newUser.save(function(err) {
        if (err) {
          return res
            .status(400)
            .json({ success: false, msg: "Username already exists." });
        }
        res
          .status(201)
          .json({ success: true, msg: "Successfully created new user." });
      });
    }
  }
});

router.post("/login", function(req, res) {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const payload = { sub: user._id, name: user.username };
            var token = jwt.sign(JSON.stringify(payload), config.secret);
            // return the information including token as JSON
            res.json({ success: true, token: token, id: payload.sub });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

router.get("/logout", function(req, res) {
  req.logOut();
  res.status(200);
});

module.exports = router;
