import React, { Component } from "react";
import { CardColumns } from "reactstrap";
import RecipeCard from "./RecipeCard";
import PropTypes from "prop-types";

export class RecipeListPage extends Component {
  render() {
    return (
      <div>
        <CardColumns>
          {this.props.recipes.map((r, i) => (
            <RecipeCard recipe={r} key={i} />
          ))}
        </CardColumns>
      </div>
    );
  }
}

RecipeListPage.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeListPage;
