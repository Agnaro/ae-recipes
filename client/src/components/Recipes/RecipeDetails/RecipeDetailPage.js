import React, { Component } from "react";
import Axios from "axios";

export class RecipeDetailPage extends Component {
  state = {
    recipe: {}
  };

  get id() {
    return this.props.match.params.id;
  }

  getRecipe() {
    Axios.get("/api/recipes/" + this.id).then(res => {
      console.log(JSON.stringify(res.data));
      this.setState({
        recipe: res.data
      });
    });
  }

  componentWillMount() {
    this.getRecipe();
  }

  render() {
    const { recipe } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <h2>{recipe.name}</h2>
        <img src={recipe.img} alt="Prepared Meal" className="detailImg" />
        <p>{recipe.desc}</p>
      </div>
    );
  }
}
export default RecipeDetailPage;
