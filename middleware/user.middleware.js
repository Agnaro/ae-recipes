const passport = require("passport");

const getUserData = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.user = user;
      return next();
    }
  })(req, res, next);
};

module.exports = { getUserData };
