const express = require("express");
const router = express.Router();
const passport = require("passport");

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
// @access Users only
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMeal = new Meal({
      day: req.body.day,
      type: req.body.type,
      name: req.body.name
    });
    newMeal.save().then(meal => res.status(201).json(meal));
  }
);

// @route PUT api/meals/:id
// @desc Edits specified meal
// @access Users only
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    const meal = req.body;

    Meal.findByIdAndUpdate(id, meal, { new: true })
      .then(meal => res.status(200).json(meal))
      .catch(err => console.log(err));
  }
);

// @route DELETE api/meals/:id
// @desc removes the specified meal
// @access Users only
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Meal.findById(req.params.id)
      .then(meal => meal.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
