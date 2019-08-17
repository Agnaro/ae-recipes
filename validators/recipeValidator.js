const Validator = require("jsonschema").Validator;
const v = new Validator();
const schema = {
  id: "/Recipe",
  type: "object",
  properties: {
    _id: { type: "string" },
    __v: { type: "string" },
    name: { type: "string" },
    desc: { type: "string" },
    ingr: { type: "string" },
    instr: { type: "string" },
    link: { type: "string" },
    pic: { type: "string" }
  },
  additionalProperties: false
};

function validate(schema, req, res, next) {
  const recipe = { ...req.body };
  try {
    v.validate(recipe, schema, { throwError: true });
    next();
  } catch (error) {
    res.status(400).send("Bad Request");
    next(error);
  }
}

module.exports = {
  post: (req, res, next) => {
    schema.required = ["name"];
    return validate(schema, req, res, next);
  },

  put: (req, res, next) => {
    return validate(schema, req, res, next);
  }
};
