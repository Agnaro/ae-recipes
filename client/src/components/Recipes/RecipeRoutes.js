import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import RecipeListPage from "./RecipeList/RecipeListPage";
import RecipeDetailPage from "./RecipeDetails/RecipeDetailPage";
import AddRecipePage from "./AddEditRecipe/AddRecipePage";
import EditRecipePage from "./AddEditRecipe/EditRecipePage";

export class RecipeRoutes extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/recipes/"
            exact={true}
            render={() => <RecipeListPage />}
          />
          <Route
            path="/recipes/new"
            exact={true}
            render={() => <AddRecipePage />}
          />
          <Route
            path="/recipes/edit/:id"
            render={rest => <EditRecipePage {...rest} />}
          />
          <Route
            path="/recipes/:id"
            render={rest => <RecipeDetailPage {...rest} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default RecipeRoutes;
