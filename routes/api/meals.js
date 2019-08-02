const express = require("express");
const router = express.Router();
const passport = require("passport");
const mealComparer = require("../../services/mealCompare.util");

// Meal model
const Meal = require("../../models/Meal");

// @route GET api/meals
// @desc Gets all meals
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Meal.find({ users: req.user.id })
      .then(meals => {
        res.json(meals.sort(mealComparer));
      })
      .catch(err => {
        console.log(err);
      });
  }
);

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
      name: req.body.name,
      users: [req.user.id]
    });
    newMeal
      .save()
      .then(meal => res.status(201).json(meal))
      .catch(err => res.status(500).end());
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
    const userId = req.user.id;

    Meal.findById(id)
      .where({ users: userId })
      .exec((err, record) => {
        if (err) {
          res.status(401).json({ success: false, msg: "Access Denied" });
        } else {
          Meal.findByIdAndUpdate(id, meal, { new: true })
            .then(meal => res.status(200).json(meal))
            .catch(err => console.log(err));
        }
      });
  }
);

// @route DELETE api/meals/:id
// @desc removes the specified meal
// @access Users only
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    Meal.findById(req.params.id)
      .where({ users: userId })
      .then(meal => meal.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
