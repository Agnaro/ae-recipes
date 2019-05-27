const User = require("../models/user");
const { Strategy, ExtractJwt } = require("passport-jwt");

var config = require("../config/keys"); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
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
