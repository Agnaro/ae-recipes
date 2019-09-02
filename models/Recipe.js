const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  desc: {
    type: String
  },
  ingr: {
    type: String
  },
  instr: {
    type: String
  },
  pic: {
    type: String
  },
  link: {
    type: String
  },
  ratings: [
    {
      userId: String,
      rating: Number,
      _id: false
    }
  ]
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
