import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

export class RecipeCard extends Component {
  render() {
    var { recipe } = this.props;
    return (
      <React.Fragment>
        <Link to={`/recipes/${recipe.id}`} style={{ color: "black" }}>
          <Card>
            <CardImg
              top
              className="recipe-img img-fluid rounded"
              src={recipe.img}
            />
            <CardBody>
              <CardTitle>
                <h5>{recipe.name}</h5>
              </CardTitle>
              <CardText>{recipe.desc}</CardText>
            </CardBody>
          </Card>
        </Link>
      </React.Fragment>
    );
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeCard;
