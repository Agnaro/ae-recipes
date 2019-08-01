import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

export class AddRecipePage extends Component {
  state = {
    recipe: [],
    pic: null,
    redirect: false
  };

  fileInput = React.createRef();

  changeHandler = evt => {
    this.setState({
      recipe: { ...this.state.recipe, [evt.target.name]: evt.target.value }
    });
  };

  submitHandler = async evt => {
    evt.preventDefault();
    const file = this.fileInput.current.files[0];
    const data = new FormData();
    data.append("pic", file);

    const { recipe } = this.state;
    Object.keys(recipe).forEach(key => data.append(key, recipe[key]));

    try {
      await axios.post("/api/recipes", data);
      this.setState({ redirect: true });
    } catch (error) {
      console.log(error);
    }
  };

  fileOnChange = () => {
    const file = this.fileInput.current.files[0];
    this.setState({ pic: file ? window.URL.createObjectURL(file) : null });
  };

  render() {
    const thumbnail =
      this.state.pic !== null ? (
        <img src={this.state.pic} width="60px" alt="thumbnail" />
      ) : (
        ""
      );

    if (this.state.redirect) {
      return <Redirect to="/recipes" />;
    } else {
      return (
        <div>
          <h3>New Recipe</h3>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={this.changeHandler}
              />
            </div>

            <div>
              <label htmlFor="desc">Description</label>
              <textarea id="desc" name="desc" onChange={this.changeHandler} />
            </div>

            <div>
              <label htmlFor="ingr">Ingredients</label>
              <textarea id="ingr" name="ingr" onChange={this.changeHandler} />
            </div>

            <div>
              <label htmlFor="instr">Instructions</label>
              <textarea id="instr" name="instr" onChange={this.changeHandler} />
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
            {thumbnail}

            <div>
              <label htmlFor="link">Source</label>
              <input
                type="url"
                id="link"
                name="link"
                onChange={this.changeHandler}
              />
            </div>

            <input type="button" value="Submit" onClick={this.submitHandler} />
          </form>
        </div>
      );
    }
  }
}

export default AddRecipePage;
