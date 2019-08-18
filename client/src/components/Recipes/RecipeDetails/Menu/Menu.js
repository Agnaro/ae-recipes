import React, { Component } from "react";
import PropTypes from "prop-types";
import "./menu.css";

import { Link } from "react-router-dom";
import RecipeDelete from "../Delete/RecipeDelete";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

export class Menu extends Component {
  static propTypes = {};

  state = {
    btnDropleft: false
  };

  toggle = () => {
    return this.setState({ btnDropleft: !this.state.btnDropleft });
  };

  render() {
    return (
      <div className="menu">
        <Dropdown
          direction="left"
          isOpen={this.state.btnDropleft}
          toggle={this.toggle}
        >
          <DropdownToggle caret />
          <DropdownMenu>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );

    //<Link to={`/recipes/edit/${this.id}`}>Edit</Link> |
    //<RecipeDelete id={this.id} deleteHandler={this.handleDelete} />;
  }
}

export default Menu;
