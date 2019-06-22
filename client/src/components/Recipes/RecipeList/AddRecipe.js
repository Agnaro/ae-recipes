import React, { Component } from "react";
import { Link } from "react-router-dom";

export class AddRecipe extends Component {
  render() {
    return (
      <Link to={`/recipes/new`}>
        <div className="add-button">+</div>
      </Link>
    );
  }
}

export default AddRecipe;
