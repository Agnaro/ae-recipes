export default class recipeService {
  constructor(RecipeModel) {
    this.Recipe = RecipeModel;
    this.perPage = 20;
  }

  Add(recipe) {
    return new Promise((resolve, reject) => {
      const newRecipe = new this.Recipe(recipe);
      newRecipe
        .save()
        .then(rec => resolve(rec))
        .catch(err => reject(err));
    });
  }

  List(page = 0) {
    return new Promise((resolve, reject) => {
      this.Recipe.find()
        .limit(this.perPage)
        .skip(this.perPage * page)
        .then(list => resolve(list))
        .catch(err => reject(err));
    });
  }

  FindById(id) {
    return new Promise((resolve, reject) => {
      this.Recipe.findById(id)
        .then(rec => resolve(rec))
        .catch(err => reject(err));
    });
  }

  FindByName(name) {
    return new Promise((resolve, reject) => {
      this.Recipe.findOne({ name: name })
        .then(rec => resolve(rec))
        .catch(err => reject(err));
    });
  }

  Update(id, recipe) {
    this.Recipe.findByIdAndUpdate(id, recipe, { new: true })
      .then(rec => resolve(rec))
      .catch(err => reject(err));
  }

  Delete(id) {
    this.FindById(id)
      .then(rec => rec.remove())
      .then(resolve())
      .catch(err => reject(err));
  }
}
