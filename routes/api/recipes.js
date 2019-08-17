const esmImport = require("esm")(module);
const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require("passport");
const multer = require("multer");
const recipeVal = require("../../validators/recipeValidator");

const recipeService = esmImport("../../services/recipeService.mjs");

// multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/img");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

router.get("/", (req, res) => {
  const recServ = new recipeService.default(Recipe);
  const page = req.query.page || null;

  recServ
    .List(page)
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).send("No recipes found."));
});

router.get("/:id", (req, res) => {
  const recServ = new recipeService.default(Recipe);

  recServ
    .FindById(req.params.id)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(404).send("Recipe not found."));
});

router.post("/", upload.single("pic"), recipeVal.post, (req, res) => {
  const recServ = new recipeService.default(Recipe);
  const recipe = { ...req.body, pic: req.file ? req.file.path : "" };

  recServ
    .Add(recipe)
    .then(rec => res.status(201).json(rec))
    .catch(err => res.status(500).send("Could not create recipe."));
});

router.put("/:id", upload.single("pic"), recipeVal.put, (req, res) => {
  const recServ = new recipeService.default(Recipe);
  const recipe = { ...req.body };
  if (req.file) {
    recipe.pic = req.file.path;
  }

  recServ
    .Update(req.params.id, recipe)
    .then(rec =>
      res.status(200).json({ id: req.params.id, msg: "Recipe updated." })
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
