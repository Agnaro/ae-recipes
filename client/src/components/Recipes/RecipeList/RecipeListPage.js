import React, { Component } from "react";
import RecipeList from "./RecipeList";
import InfiniteScroll from "../../Utility/InfiniteScroll";
import AddRecipe from "./AddRecipe";
import Axios from "axios";

export class RecipeListPage extends Component {
  getRecipes() {
    return Axios.get("/api/recipes");
  }

  childRender(data) {
    return <RecipeList data={data} />;
  }

  render() {
    return (
      <div>
        <InfiniteScroll getData={this.getRecipes} render={this.childRender} />
        <AddRecipe />
      </div>
    );
  }
}

export default RecipeListPage;
