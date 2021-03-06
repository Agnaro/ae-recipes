import React, { Component } from "react";
import { server } from "../../../utils";
import Axios from "axios";
import PropTypes from "prop-types";
import "./recipeDetails.css";
import { Spinner } from "reactstrap";

import Menu from "./Menu/Menu";
import Rating from "./Rating/Rating";
import Source from "./Source/Source";
import Tags from "./Tags/Tags";

class RecipeDetailPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }),
    history: PropTypes.object.isRequired
  };

  state = {
    recipe: {},
    loading: true,
    rating: 0
  };

  get id() {
    return this.props.match.params.id;
  }

  getRecipe(id) {
    Axios.get("/api/recipes/" + id)
      .then(res => {
        console.log(res.data);
        this.setState({
          recipe: res.data,
          loading: false,
          rating: res.data.rating
        });
      })
      .catch(err => console.log(err));
  }

  handleRating = async value => {
    try {
      const data = {
        rating: value
      };
      const result = await Axios.post(
        "/api/recipes/" + this.id + "/rate/",
        data
      );
      this.setState({ rating: result.data.rating });
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async id => {
    try {
      await Axios.delete("/api/recipes/" + id);
      this.props.history.push("/recipes/");
    } catch (error) {
      console.log(error);
    }
  };

  renderLoading = () => {
    return (
      <div>
        <Spinner color="dark" />
      </div>
    );
  };

  renderPage = recipe => {
    const ingr = String(recipe.ingr)
      .trim()
      .replace(/\n\n/g, "\n")
      .split("\n");
    const instr = String(recipe.instr)
      .trim()
      .replace(/\n\n/g, "\n")
      .split("\n");

    return (
      <div className="recipe-page-box recipe-page">
        <div className="name">
          <div className="name-box">
            <h2>{recipe.name}</h2>
            <Rating
              rating={this.state.rating}
              ratingChange={this.handleRating}
            />
          </div>
          <Menu id={this.id} handleDelete={this.handleDelete} />
        </div>
        <img
          src={server + recipe.pic}
          alt="Prepared Meal"
          className="detail-img"
        />
        <p className="desc">{recipe.desc}</p>
        <Tags />
        <Source url={recipe.link} />
        <div className="ingr">
          <h3>Ingredients</h3>
          <ul>
            {ingr.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="instr">
          <h3>Instructions</h3>
          <ol>
            {instr.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.getRecipe(this.id);
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else {
      return this.renderPage(this.state.recipe);
    }
  }
}

export default RecipeDetailPage;
