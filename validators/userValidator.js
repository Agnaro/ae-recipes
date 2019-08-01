const config = require("../config/keys");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const registerSchema = {
  id: "/Register",
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
    key: { type: "string" }
  },
  required: ["username", "password", "key"],
  additionalProperties: false
};

const loginSchema = {
  id: "/Login",
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" }
  },
  required: ["username", "password"],
  additionalProperties: false
};

module.exports = {
  userSignup: (req, res, next) => {
    try {
      const instance = { ...req.body };
      v.validate(instance, registerSchema, { throwError: true });

      const { key } = instance;
      if (key !== config.registerKey) {
        res.status(401).send("Invalid registration key.");
      } else {
        next();
      }
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  },

  userLogin: (req, res, next) => {
    try {
      const instance = { ...req.body };
      v.validate(instance, loginSchema, { throwError: true });
      next();
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  }
};
