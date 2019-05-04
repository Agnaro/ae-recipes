const express = require("express");
const router = express.Router();

// Meal model
const Meal = require("../../models/Meal");

// @route GET api/meals
// @desc Gets all meals
// @access Public
router.get("/", (req, res) => {
  Meal.find()
    //.sort({ day: -1 })
    .then(meals => {
      res.json(meals);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route POST api/meals
// @desc Add new meal
// @access Public
router.post("/", (req, res) => {
  const newMeal = new Meal({
    day: req.body.day,
    type: req.body.type,
    name: req.body.name
  });
  newMeal.save().then(meal => res.status(201).json(meal));
});

module.exports = router;
