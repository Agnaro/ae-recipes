import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  DropdownItem
} from "reactstrap";

export class RecipeDelete extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  buttonHandler = evt => {
    evt.preventDefault();
    this.props.deleteHandler(this.props.id);
  };

  render() {
    return (
      <React.Fragment>
        <DropdownItem onClick={this.props.toggle}>Delete</DropdownItem>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader>Delete Recipe</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this recipe?</p>
            <Button color="danger" onClick={this.buttonHandler}>
              Delete
            </Button>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RecipeDelete;
