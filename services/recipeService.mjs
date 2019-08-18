import * as fs from "fs";
import * as path from "path";

export default class recipeService {
  constructor(RecipeModel) {
    this.Recipe = RecipeModel;
    this.perPage = 20;
  }

  deleteFile(relFilePath) {
    return new Promise((resolve, reject) => {
      const __dirname = path.resolve();
      const fullpath = path.resolve(__dirname, relFilePath);
      fs.unlink(fullpath, err => {
        if (err) {
          if ((err.errno = -4058)) {
            resolve();
          }
          reject(err);
        } else {
          resolve();
        }
      });
    });
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

  async Update(id, recipe) {
    try {
      const query = this.Recipe.findById(id);
      if (recipe.pic) {
        const dbRecipe = await query.exec();
        if (dbRecipe.pic !== "") {
          //need to delete old pic
          await this.deleteFile(dbRecipe.pic);
        }
      }
      //update text fields
      await query.updateOne(recipe);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Delete(id) {
    try {
      const query = this.Recipe.findById(id);
      const dbRecipe = await query.exec();
      if (dbRecipe.pic !== "") {
        await this.deleteFile(dbRecipe.pic);
      }
      await query.deleteOne();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
