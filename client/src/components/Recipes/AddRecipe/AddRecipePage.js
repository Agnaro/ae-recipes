import React, { Component } from "react";

export class AddRecipePage extends Component {
  changeHandler = evt => {
    this.setState({
      meal: { ...this.state.meal, [evt.target.name]: evt.target.value }
    });
  };

  render() {
    return (
      <div>
        <h3>New Recipe</h3>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>

          <div>
            <label htmlFor="desc">Description</label>
            <textarea id="desc" name="desc" />
          </div>

          <div>
            <label htmlFor="ingr">Ingredients</label>
            <textarea id="ingr" name="ingr" />
          </div>

          <div>
            <label htmlFor="instr">Instructions</label>
            <textarea id="instr" name="instr" />
          </div>

          <div>
            <label htmlFor="pic">Upload Picture</label>
            <input type="file" id="pic" name="pic" />
          </div>

          <div>
            <label htmlFor="link">Source</label>
            <input type="url" id="link" name="link" />
          </div>

          <input type="button" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddRecipePage;
