const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt
      .hash(user.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => {
        return next(err);
      });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = (module.exports = mongoose.model("User", UserSchema));
