import React, { Component } from "react";
import RecipeForm from "./RecipeForm";
import axios from "axios";
import { Error } from "mongoose";

export class EditRecipePage extends Component {
  get url() {
    return "/api/recipes/" + this.props.match.params.id;
  }

  getRecipe = async () => {
    const res = await axios.get(this.url);
    return res.data;
  };

  updateRecipe = async (recipe, file) => {
    const data = new FormData();
    if (file) {
      delete recipe.pic;
      data.append("pic", file);
    }

    Object.keys(recipe).forEach(key => data.append(key, recipe[key]));
    try {
      await axios.put(this.url, data);
      return true;
    } catch (error) {
      throw new Error("Error updating recipe");
    }
  };

  render() {
    return (
      <div className="recipe-form-container">
        <h3>Edit Recipe</h3>
        <RecipeForm
          getOriginalRecipe={this.getRecipe}
          submitHandler={this.updateRecipe}
        />
      </div>
    );
  }
}

export default EditRecipePage;
