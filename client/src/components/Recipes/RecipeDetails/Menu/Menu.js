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
  static propTypes = {
    id: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired
  };

  state = {
    isOpenDropdown: false,
    isOpenModal: false
  };

  toggleDropdown = () => {
    this.setState(prevState => {
      return { isOpenDropdown: !prevState.isOpenDropdown };
    });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isOpenModal: !prevState.isOpenModal };
    });
  };

  render() {
    return (
      <div className="menu">
        <Dropdown
          direction="left"
          isOpen={this.state.isOpenDropdown}
          toggle={this.toggleDropdown}
        >
          <DropdownToggle caret />
          <DropdownMenu>
            <Link to={`/recipes/edit/${this.props.id}`}>
              <DropdownItem>Edit</DropdownItem>
            </Link>
            <RecipeDelete
              id={this.props.id}
              deleteHandler={this.props.handleDelete}
              isOpen={this.state.isOpenModal}
              toggle={this.toggleModal}
            />
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default Menu;
