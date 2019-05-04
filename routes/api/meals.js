const express = require("express");
const router = express.Router();

// Meal model
const Meal = require("../../models/Meal");

// @route GET api/meals
// @desc Gets all meals
// @access Public
router.get("/", (req, res) => {
  Meal.find()
    .sort({ day: "desc", type: "asc" })
    .then(meals => {
      res.json(meals);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route POST api/meals
// @desc Add new meal
// @access Public (for now)
router.post("/", (req, res) => {
  const newMeal = new Meal({
    day: req.body.day,
    type: req.body.type,
    name: req.body.name
  });
  newMeal.save().then(meal => res.status(201).json(meal));
});

// @route DELETE api/meals/:id
// @desc removes the specified meal
// @access Public (for now)
router.delete("/:id", (req, res) => {
  Meal.findById(req.params.id)
    .then(meal => meal.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
