const esmImport = require("esm")(module);
const express = require("express");
const router = express.Router();
const Recipe = require("../../models/Recipe");
const passport = require("passport");
const multer = require("multer");
const recipeVal = require("../../validators/recipeValidator");
const ratingRoutes = require("./recipeRating/rating");
const userMiddleware = require("../../middleware/user.middleware");

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

router.get("/", (req, res, next) => {
  const recServ = new recipeService.default(Recipe);
  const page = req.query.page || null;

  recServ
    .List(page)
    .then(recipes => res.status(200).json(recipes))
    .catch(err => {
      res.status(500).send("No recipes found.");
      next(err);
    });
});

router.get("/:id", userMiddleware.getUserData, (req, res, next) => {
  const recServ = new recipeService.default(Recipe, req.user);

  recServ
    .FindById(req.params.id)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => {
      res.status(404).send("Recipe not found.");
      next(err);
    });
});

router.all("*", passport.authenticate("jwt", { session: false }));

router.post("/", upload.single("pic"), recipeVal.post, (req, res, next) => {
  const recServ = new recipeService.default(Recipe);
  const recipe = { ...req.body, pic: req.file ? req.file.path : "" };

  recServ
    .Add(recipe)
    .then(rec => res.status(201).json(rec))
    .catch(err => {
      res.status(500).send("Could not create recipe.");
      next(err);
    });
});

router.put("/:id", upload.single("pic"), recipeVal.put, (req, res, next) => {
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
    .catch(err => {
      res.status(500).send("Could not update recipe");
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  const recServ = new recipeService.default(Recipe);

  recServ
    .Delete(req.params.id)
    .then(res.status(200).send("Recipe deleted"))
    .catch(err => {
      res.status(500).status("Could not delete recipe");
      next(err);
    });
});

router.use("/", ratingRoutes);

router.use((err, req, res, next) => {
  console.log("Recipe router error:");
  console.log(err);
  //next(err);
});

module.exports = router;
