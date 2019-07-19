import React, { Component } from "react";

export class AddRecipePage extends Component {
  state = {
    recipe: [],
    pic: ""
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
    try {
      const res = await this.readUploadedFile(file);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  fileOnChange = () => {
    const file = this.fileInput.current.files[0];
    this.setState({ pic: file ? window.URL.createObjectURL(file) : "" });
  };

  readUploadedFile = inputFile => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsBinaryString(inputFile);
    });
  };

  render() {
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
          <img src={this.state.pic} width="60px" />

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

export default AddRecipePage;
