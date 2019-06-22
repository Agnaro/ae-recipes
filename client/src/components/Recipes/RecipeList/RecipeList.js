import React, { Component } from "react";
import RecipeCard from "./RecipeCard";

import PropTypes from "prop-types";
import "./recipe.css";

export class RecipeList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="recipe-list">
        {this.props.data.map((d, i) => (
          <RecipeCard recipe={d} key={i} />
        ))}
      </div>
    );
  }
}

export default RecipeList;
