const User = require("../models/User");
const { Strategy, ExtractJwt } = require("passport-jwt");

var config = require("../config/keys"); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = config.secret;
  passport.use(
    new Strategy(opts, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["SESSIONID"];
  }
  return token;
};
