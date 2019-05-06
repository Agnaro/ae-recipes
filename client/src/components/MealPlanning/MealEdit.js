import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editMeal } from "../../actions/meal_actions/mealActions";

export class MealEdit extends Component {
  state = {
    modal: false,
    meal: this.props.meal
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  submitMeal = evt => {
    evt.preventDefault();
    this.props.editMeal(this.state.meal);
    this.toggle();
  };

  changeHandler = evt => {
    this.setState({
      meal: { ...this.state.meal, [evt.target.name]: evt.target.value }
    });
  };

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      meal: props.meal
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Button color="dark" onClick={this.toggle} className=".btn-edit">
          Edit
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Meal</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="day">Day</Label>
                <Input
                  type="select"
                  name="day"
                  id="day"
                  value={this.state.meal.day}
                  onChange={this.changeHandler}
                >
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={this.state.meal.type}
                  onChange={this.changeHandler}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Dessert</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="name">Recipe Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.changeHandler}
                  value={this.state.meal.name}
                />
              </FormGroup>
              <Button color="dark" onClick={this.submitMeal}>
                Save
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

MealEdit.propTypes = {
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meals: state.meal
});

export default connect(
  mapStateToProps,
  {
    editMeal
  }
)(MealEdit);
