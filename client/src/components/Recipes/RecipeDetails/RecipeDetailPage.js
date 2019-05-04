import React, { Component } from "react";
import PropTypes from "prop-types";

export class RecipeDetailPage extends Component {
  render() {
    const {
      match: { params }
    } = this.props;

    const recipe = this.props.recipes.find(r => r.id === +params.id);

    return (
      <div style={{ textAlign: "center" }}>
        <h2>{recipe.name}</h2>
        <img src={recipe.img} alt="Prepared Meal" class="detail-img" />
        <p>{recipe.desc}</p>
      </div>
    );
  }
}

RecipeDetailPage.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeDetailPage;
