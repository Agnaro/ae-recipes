import Recipe from "../models/Recipe.js";

export default class recipeService {
  Add = recipe => {
    return new Promise((resolve, reject) => {
      const newRecipe = new Recipe(recipe);
      newRecipe
        .save()
        .then((rec = resolve(rec)))
        .catch(err => reject(err));
    });
  };

  List = (max = 20) => {
    return new Promise((resolve, reject) => {
      Recipe.find(null, null, { limit: max })
        .then(list => resolve(list))
        .catch(err => reject(err));
    });
  };

  FindById = id => {
    return new Promise((resolve, reject) => {
      Recipe.findById(id)
        .then(rec => resolve(rec))
        .catch(err => reject(err));
    });
  };

  FindByName = name => {
    return new Promise((resolve, reject) => {
      Recipe.findOne({ name: name })
        .then(rec => resolve(rec))
        .catch(err => reject(err));
    });
  };

  Update = (id, recipe) => {
    Recipe.findByIdAndUpdate(id, recipe, { new: true })
      .then(rec => resolve(rec))
      .catch(err => reject(err));
  };

  Delete = id => {
    this.FindById(id)
      .then(rec => rec.remove())
      .then(resolve())
      .catch(err => reject(err));
  };
}
