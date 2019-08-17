const esmImport = require("esm")(module);
const recipeService = esmImport("./recipeService.mjs");

const RECIPES = ["123", "456"];

const mockRecipe = (recipes = RECIPES) => {
  const recipe = {};
  const query = mockQuery(recipes);
  recipe.query = query;
  recipe.find = jest.fn(() => query);
  recipe.findById = jest.fn(() => Promise.resolve());
  return recipe;
};

const mockQuery = returnVal => {
  var query = {};
  query.limit = jest.fn().mockReturnValue(query);
  query.skip = jest.fn().mockReturnValue(query);
  query.then = jest.fn(cb => Promise.resolve(cb(returnVal)));
  return query;
};

const mockRecipeErr = () => {
  const recipe = {};
  recipe.find = jest.fn(() => Promise.reject(new Error("test")));
  recipe.findById = jest.fn(() => Promise.reject(new Error("test")));
  return recipe;
};

class mockRecipeClass {}

describe("The recipe service", () => {
  describe("The list method", () => {
    it("should return an array", () => {
      const mock = mockRecipe();
      const recipeServ = new recipeService.default(mock);
      return recipeServ.List().then(res => {
        expect(res).toEqual(RECIPES);
        expect(mock.find).toHaveBeenCalled();
      });
    });
    it("should return a rejected promise on a database error", () => {
      const mock = mockRecipeErr();
      const recipeServ = new recipeService.default(mock);
      expect(recipeServ.List()).rejects.toEqual(new Error("test"));
    });
    it("should pass a limit parameter to mongoose equal to the max parameter", async () => {
      const mock = mockRecipe();
      const r = new recipeService.default(mock);
      await r.List(1);
      expect(mock.find).toHaveBeenCalled();
      expect(mock.query.limit).toHaveBeenCalled();
      expect(mock.query.skip).toHaveBeenCalled();
    });
  });
  describe("the FindById function", () => {
    it("should call the findById method on the model", async () => {
      const mock = mockRecipe();
      const r = new recipeService.default(mock);
      await r.FindById(1);
      expect(mock.findById).toHaveBeenCalledWith(1);
    });
    it("should throw an error on a database error", () => {
      const mock = mockRecipeErr();
      const r = new recipeService.default(mock);
      expect(r.FindById(1)).rejects.toEqual(new Error("test"));
    });
  });
});
