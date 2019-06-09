const esmImport = require("esm")(module);
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userVal = require("../../validators/userValidator");

// Bring in Models
let User = require("../../models/User");

const userService = esmImport("../../services/userService.mjs");

// Register Process
router.post("/register", userVal.userSignup, function(req, res) {
  const userDTO = { username: req.body.username, password: req.body.password };
  const userServInst = new userService.default();

  userServInst
    .Signup(userDTO)
    .then(result => res.status(200).json({ msg: result.msg }))
    .catch(err => res.status(err.status).json({ msg: err.msg }));
});

router.post("/login", userVal.userLogin, function(req, res) {
  const userDTO = { username: req.body.username, password: req.body.password };
  const userServInst = new userService.default();

  if (process.env.NODE_ENV === "production") {
    var tokenOpts = { httpOnly: true, secure: true };
  } else {
    var tokenOpts = { httpOnly: true };
  }

  userServInst
    .Login(userDTO)
    .then(userInfo => {
      // return token in cookie
      res.cookie("SESSIONID", userInfo.token, tokenOpts);
      // return the user id as JSON
      res.json({ success: true, id: userInfo.id });
    })
    .catch(err => res.status(err.status).json({ msg: err.msg }));
});

router.get("/logout", function(req, res) {
  req.logOut();

  res.cookie("SESSIONID", null, { maxAge: -1 });
  res.status(200).json({ success: true });
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userServInst = new userService.default();

    userServInst
      .returnUserInfo(req.user.id)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(err.status).json({ msg: err.msg }));
  }
);

module.exports = router;
