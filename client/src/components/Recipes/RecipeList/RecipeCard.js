import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
import { server } from "../../../utils";
import PropTypes from "prop-types";

export class RecipeCard extends Component {
  render() {
    var { recipe } = this.props;
    return (
      <div className="recipe-card">
        <Link to={`/recipes/${recipe._id}`}>
          <Card>
            <CardImg
              top
              className="recipe-img img-fluid rounded"
              src={server + recipe.pic}
            />
            <CardBody>
              <CardTitle>
                <h5>{recipe.name}</h5>
              </CardTitle>
              <CardText>{recipe.desc}</CardText>
            </CardBody>
          </Card>
        </Link>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeCard;
