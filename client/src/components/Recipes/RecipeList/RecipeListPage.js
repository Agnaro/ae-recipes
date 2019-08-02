import React, { Component } from "react";
import RecipeList from "./RecipeList";
import InfiniteScroll from "../../Utility/InfiniteScroll";
import AddRecipe from "./AddRecipe";
import Axios from "axios";

export class RecipeListPage extends Component {
  getRecipes(page = 0) {
    return Axios.get(`/api/recipes?page=${page}`);
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
