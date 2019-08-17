import React, { Component } from "react";
import { server } from "../../../utils";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./recipeDetails.css";

export class RecipeDetailPage extends Component {
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

  componentDidMount() {
    this.getRecipe(this.id);
  }

  render() {
    const { recipe } = this.state;
    const ingr = String(recipe.ingr)
      .trim()
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

        <Link to={`/recipes/edit/${this.id}`}>Edit</Link>
      </div>
    );
  }
}
export default RecipeDetailPage;
