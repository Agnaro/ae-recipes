const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Meal = mongoose.model("meals", MealSchema);
