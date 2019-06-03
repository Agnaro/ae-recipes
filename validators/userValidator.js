const config = require("../config/keys");

module.exports = {
  userSignup: (req, res, next) => {
    const { username, password, key } = req.body;
    if (!username || !password) {
      res.status(400).json({ msg: "Please pass username and password." });
    } else {
      if (key !== config.registerKey) {
        res.status(401).json({ msg: "Invalid registration key." });
      } else {
        next();
      }
    }
  },

  userLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ msg: "Please pass username and password." });
    } else {
      next();
    }
  }
};
