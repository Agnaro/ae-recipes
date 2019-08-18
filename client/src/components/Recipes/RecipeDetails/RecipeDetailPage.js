import React, { Component } from "react";
import { server } from "../../../utils";
import Axios from "axios";
import { Link } from "react-router-dom";
import RecipeDelete from "./Delete/RecipeDelete";
import PropTypes from "prop-types";
import "./recipeDetails.css";

export class RecipeDetailPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }),
    history: PropTypes.object.isRequired
  };

  state = {
    recipe: {}
  };

  get id() {
    return this.props.match.params.id;
  }

  getRecipe(id) {
    Axios.get("/api/recipes/" + id).then(res => {
      this.setState({
        recipe: res.data
      });
    });
  }

  handleDelete = async id => {
    try {
      await Axios.delete("/api/recipes/" + id);
      this.props.history.push("/recipes/");
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getRecipe(this.id);
  }

  render() {
    const { recipe } = this.state;
    const ingr = String(recipe.ingr)
      .trim()
      .replace(/\n\n/g, "\n")
      .split("\n");
    const instr = String(recipe.instr)
      .trim()
      .replace(/\n\n/g, "\n")
      .split("\n");
    return (
      <div className="page-box">
        <h2>{recipe.name}</h2>
        <img
          src={server + recipe.pic}
          alt="Prepared Meal"
          className="detail-img"
        />
        <a href={recipe.link}>Source</a>
        <p>{recipe.desc}</p>
        <h3>Ingredients</h3>
        <ul className="ingr-list">
          {ingr.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <ol className="instr">
          {instr.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
        <Link to={`/recipes/edit/${this.id}`}>Edit</Link>|
        <RecipeDelete id={this.id} deleteHandler={this.handleDelete} />
      </div>
    );
  }
}
export default RecipeDetailPage;
