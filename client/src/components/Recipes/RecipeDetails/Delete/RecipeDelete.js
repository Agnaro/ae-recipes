import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

export class RecipeDelete extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  buttonHandler = evt => {
    evt.preventDefault();
    this.props.deleteHandler(this.props.id);
  };

  render() {
    return (
      <React.Fragment>
        <Button color="link" onClick={this.toggle}>
          Delete
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
