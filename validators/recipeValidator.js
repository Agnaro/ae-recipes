const Validator = require("jsonschema").Validator;
const v = new Validator();
const schema = {
  id: "/Recipe",
  type: "object",
  properties: {
    name: { type: "string" },
    desc: { type: "string" },
    ingr: { type: "string" },
    instr: { type: "string" },
    link: { type: "string" }
  },
  required: ["name"],
  additionalProperties: false
};

module.exports = (req, res, next) => {
  const recipe = { ...req.body };
  try {
    v.validate(recipe, schema, { throwError: true });
    next();
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
