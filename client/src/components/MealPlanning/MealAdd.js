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
import { connect } from "react-redux";
import { addMeal } from "../../actions/meal_actions/mealActions";

export class MealAdd extends Component {
  state = {
    modal: false,
    meal: {
      day: "Sunday",
      type: "Dinner",
      name: ""
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  submitMeal = evt => {
    evt.preventDefault();

    this.props.addMeal(this.state.meal);
    this.resetForm();
    this.toggle();
  };

  changeHandler = evt => {
    this.setState({
      meal: { ...this.state.meal, [evt.target.name]: evt.target.value }
    });
  };

  resetForm = () => {
    this.setState({
      meal: {
        day: "Sunday",
        type: "Dinner",
        name: ""
      }
    });
  };

  render() {
    return (
      <div>
        <Button color="dark" onClick={this.toggle}>
          Add Meal
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Meal</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="day">Day</Label>
                <Input
                  type="select"
                  name="day"
                  id="day"
                  onChange={this.changeHandler}
                  value={this.state.meal.day}
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
                  defaultValue="Dinner"
                  onChange={this.changeHandler}
                  value={this.state.meal.type}
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
                  value={this.state.meal.name}
                  onChange={this.changeHandler}
                />
              </FormGroup>
              <Button color="dark" onClick={this.submitMeal}>
                Add Meal
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapSateToProps,
  { addMeal }
)(MealAdd);
