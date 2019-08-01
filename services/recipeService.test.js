const esmImport = require("esm")(module);
const recipeService = esmImport("./recipeService.mjs");

const RECIPES = ["123", "456"];

const mockRecipe = (recipes = RECIPES) => {
  const recipe = {};
  recipe.find = jest.fn(() => Promise.resolve(RECIPES));
  recipe.findById = jest.fn(() => Promise.resolve());
  return recipe;
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
      expect(mock.find).toHaveBeenCalledWith(null, null, { limit: 1 });
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
