import React, { Component } from "react";
import { Route } from "react-router-dom";
import RecipeListPage from "./RecipeList/RecipeListPage";
import RecipeDetailPage from "./RecipeDetails/RecipeDetailPage";

export class RecipeRoutes extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path="/recipes/"
          exact={true}
          render={() => <RecipeListPage recipes={RECIPES} />}
        />
        <Route
          path="/recipes/:id"
          render={rest => <RecipeDetailPage {...rest} recipes={RECIPES} />}
        />
      </React.Fragment>
    );
  }
}

const RECIPES = [
  {
    id: 1,
    name: "Sweet Potato Casserole",
    img: "/recipes/md105195_1109_swtpot_176_horiz.jpg",
    desc: "A casserole with sweet potatoes."
  },
  {
    id: 2,
    name: "Carabaccia",
    img: "/recipes/Carabaccia-4.jpg",
    desc: "A soup thing?"
  },
  {
    id: 3,
    name: "Butter Chicken",
    img: "/recipes/Butter-Chicken-IMAGE-27.jpg",
    desc: "Not as good as Chicken Tikka Masala."
  }
];

export default RecipeRoutes;
