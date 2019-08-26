import React, { Component } from "react";
import { Redirect } from "react-router";
import Thumbnail from "./Thumbnail";
import PropTypes from "prop-types";
import { server } from "../../../utils";
import className from "classnames";
import { checkName, checkDesc, checkAll } from "./recipe.validation";
import "./recipeForm.css";

export class RecipeForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    getOriginalRecipe: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  };

  static defaultProps = {
    getOriginalRecipe: false
  };

  state = {
    recipe: {
      name: "",
      desc: "",
      ingr: "",
      instr: "",
      link: ""
    },
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

  imageBtnOnClick = () => {
    document.querySelector("#pic").dispatchEvent(new MouseEvent("click"));
  };

  submit = async evt => {
    evt.preventDefault();
    const file = this.fileInput.current.files[0];
    this.name = this.state.recipe.name; //run recipe name through the setter to make sure validation is done
    const { recipe } = this.state;
    if (checkAll(recipe)) {
      try {
        await this.props.submitHandler(recipe, file);
        this.setState({ redirect: true });
      } catch (error) {
        console.log(error);
      }
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

    var nameInputClass = className({
      "input-invalid": !checkName(this.state.recipe.name)
    });

    var descInputClass = className({
      "input-invalid": !checkDesc(this.state.recipe.desc)
    });

    if (this.state.redirect) {
      return <Redirect to="/recipes" />;
    } else {
      return (
        <div className="recipe-form">
          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={this.changeHandler}
              className={nameInputClass}
            />
          </div>

          <div className="desc">
            <label htmlFor="desc">
              Description <small>(200 character max)</small>
            </label>
            <textarea
              id="desc"
              name="desc"
              value={recipe.desc}
              onChange={this.changeHandler}
              className={descInputClass}
            />
          </div>

          <div className="ingr">
            <label htmlFor="ingr">Ingredients</label>
            <textarea
              id="ingr"
              name="ingr"
              value={recipe.ingr}
              onChange={this.changeHandler}
            />
          </div>

          <div className="instr">
            <label htmlFor="instr">Instructions</label>
            <textarea
              id="instr"
              name="instr"
              value={recipe.instr}
              onChange={this.changeHandler}
            />
          </div>

          <div className="pic">
            <label>Image</label>
            <div className="btn btn-dark" onClick={this.imageBtnOnClick}>
              Upload
            </div>
            <input
              type="file"
              id="pic"
              name="pic"
              accept="image/*"
              ref={this.fileInput}
              onChange={this.fileOnChange}
            />
            <Thumbnail
              url={this.state.pic}
              className="thumbnail"
              placeholder={<div className="thumbnail-placeholder">Preview</div>}
            />
          </div>

          <div className="link">
            <label htmlFor="link">Source</label>
            <input
              type="url"
              id="link"
              name="link"
              placeholder="https://"
              value={recipe.link}
              onChange={this.changeHandler}
            />
          </div>

          <input
            type="button"
            value="Save"
            onClick={this.submit}
            className="submit-btn btn btn-dark"
          />
        </div>
      );
    }
  }
}

export default RecipeForm;
