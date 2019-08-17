import React, { Component } from "react";
import { Redirect } from "react-router";
import Thumbnail from "./Thumbnail";
import PropTypes from "prop-types";
import { server } from "../../../utils";

export class RecipeForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired
  };

  static defaultProps = {
    getOriginalRecipe: false
  };

  state = {
    recipe: {},
    pic: null,
    redirect: false,
    originalReceived: false
  };

  fileInput = React.createRef();

  get fileUrl() {
    const file = this.fileInput.current.files[0];
    if (file) {
      return window.URL.createObjectURL(file);
    } else {
      if (this.state.recipe.pic) {
        return server + this.state.recipe.pic;
      } else {
        return null;
      }
    }
  }

  changeHandler = evt => {
    this.setState({
      recipe: { ...this.state.recipe, [evt.target.name]: evt.target.value }
    });
  };

  fileOnChange = () => {
    this.setState({ pic: this.fileUrl });
  };

  submit = async evt => {
    evt.preventDefault();
    const file = this.fileInput.current.files[0];
    const { recipe } = this.state;
    try {
      await this.props.submitHandler(recipe, file);
      this.setState({ redirect: true });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    if (typeof this.props.getOriginalRecipe === "function") {
      if (!this.state.originalReceived) {
        const recipe = await this.props.getOriginalRecipe();
        this.setState({
          recipe: recipe,
          pic: server + recipe.pic,
          originalReceived: true
        });
      }
    }
  }

  render() {
    const recipe = this.state.recipe;

    if (this.state.redirect) {
      return <Redirect to="/recipes" />;
    } else {
      return (
        <div>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipe.name || ""}
                onChange={this.changeHandler}
              />
            </div>

            <div>
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                name="desc"
                value={recipe.desc || ""}
                onChange={this.changeHandler}
              />
            </div>

            <div>
              <label htmlFor="ingr">Ingredients</label>
              <textarea
                id="ingr"
                name="ingr"
                value={recipe.ingr || ""}
                onChange={this.changeHandler}
              />
            </div>

            <div>
              <label htmlFor="instr">Instructions</label>
              <textarea
                id="instr"
                name="instr"
                value={recipe.instr || ""}
                onChange={this.changeHandler}
              />
            </div>

            <div>
              <label htmlFor="pic">Upload Picture</label>
              <input
                type="file"
                id="pic"
                name="pic"
                accept="image/*"
                ref={this.fileInput}
                onChange={this.fileOnChange}
              />
            </div>
            <Thumbnail url={this.state.pic} />

            <div>
              <label htmlFor="link">Source</label>
              <input
                type="url"
                id="link"
                name="link"
                value={recipe.link || ""}
                onChange={this.changeHandler}
              />
            </div>

            <input type="button" value="Submit" onClick={this.submit} />
          </form>
        </div>
      );
    }
  }
}

export default RecipeForm;
