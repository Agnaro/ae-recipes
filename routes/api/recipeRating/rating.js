const express = require("express");
const router = express.Router();
const passport = require("passport");
const esmImport = require("esm")(module);
const Recipe = require("../../../models/Recipe");
const recipeService = esmImport("../../../services/recipeService.mjs");

router.all("*", passport.authenticate("jwt", { session: false }));

router.post("/:id/rate", (req, res, next) => {
  //save recipe to user profile
  const recipeServ = new recipeService.default(Recipe);
  const userId = req.user._id;
  const recipeId = req.params.id;
  const { rating } = req.body;

  recipeServ
    .Rate(recipeId, userId, rating)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => next(err));
});

module.exports = router;
