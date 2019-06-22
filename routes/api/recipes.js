const esmImport = require("esm")(module);
const express = require("express");
const router = express.Router();
const passport = require("passport");
//const recipeVal = require("../../validators/recipeValidator");

const recipeService = esmImport("../../services/recipeService.mjs");

router.get("/", (req, res) => {
  const recServ = new recipeService.default();
  const limit = req.params.limit || null;

  recServ
    .List(limit)
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).send("No recipes found."));
});

router.get("/:id", (req, res) => {
  const recServ = new recipeService.default();

  recServ
    .FindById(req.params.id)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(404).send("Recipe not found."));
});

router.post("/", (req, res) => {
  const recServ = new recipeService.default();
  const { recipe } = req.body;

  recServ
    .Add(recipe)
    .then(rec => res.status(201).json(rec))
    .catch(err => res.status(500).send("Could not add recipe."));
});

module.exports = router;
