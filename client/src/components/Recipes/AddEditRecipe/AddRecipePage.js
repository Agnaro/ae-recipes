import React, { Component } from "react";
import RecipeForm from "./RecipeForm";
import axios from "axios";

export class AddRecipePage extends Component {
  postRecipe = async (recipe, file) => {
    const data = new FormData();
    data.append("pic", file);

    Object.keys(recipe).forEach(key => data.append(key, recipe[key]));
    try {
      await axios.post("/api/recipes", data);
      return true;
    } catch (error) {
      throw new Error("Error adding recipe");
    }
  };

  render() {
    return (
      <div className="recipe-form-container">
        <h3>Add Recipe</h3>
        <RecipeForm submitHandler={this.postRecipe} />
      </div>
    );
  }
}

export default AddRecipePage;
