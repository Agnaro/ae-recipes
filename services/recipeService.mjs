import * as fs from "fs";
import * as path from "path";

export default class recipeService {
  constructor(RecipeModel, user = null) {
    this.Recipe = RecipeModel;
    this.perPage = 20;
    this.userId = user ? user.id : null;
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
        .then(rec => {
          const recipeObj = rec.toObject();
          const recipeWithoutRatings = Object.assign({}, recipeObj);
          delete recipeWithoutRatings.ratings;
          if (this.userId) {
            const rating = this.getRatingFromArray(
              recipeObj.ratings,
              this.userId
            );
            return resolve(Object.assign(recipeWithoutRatings, { rating }));
          } else {
            return resolve(recipeWithoutRatings);
          }
        })
        .catch(err => reject(err));
    });
  }

  getRatingFromArray(ratings, userId) {
    if (ratings) {
      const ratingObj = ratings.find(el => el.userId === userId) || {
        rating: 0
      };
      return ratingObj.rating;
    } else {
      return 0;
    }
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

  async Rate(recipeId, userId, rating) {
    try {
      let result;
      if (await this.userHasPreviouslyRated(recipeId, userId)) {
        result = await this.updateRating(recipeId, userId, rating);
      } else {
        result = await this.insertRating(recipeId, userId, rating);
      }
      return { userId, rating };
    } catch (error) {
      throw new Error(error);
    }
  }

  async userHasPreviouslyRated(recipeId, userId) {
    const result = await this.Recipe.find({
      _id: recipeId,
      "ratings.userId": userId
    }).exec();
    return result.length !== 0;
  }

  async insertRating(recipeId, userId, rating) {
    return await this.Recipe.findById(recipeId).updateOne(
      {},
      { $addToSet: { ratings: { userId: userId, rating: rating } } }
    );
  }

  async updateRating(recipeId, userId, rating) {
    return await this.Recipe.findById(recipeId).updateOne(
      {},
      {
        $set: { "ratings.$[elem].rating": rating }
      },
      { arrayFilters: [{ "elem.userId": userId }] }
    );
  }
}
