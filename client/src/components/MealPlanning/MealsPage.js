import React, { Component } from "react";
import MealList from "./MealList";
import MealAdd from "./MealAdd";
import { connect } from "react-redux";
import { getMeals, addMeal } from "../../actions/meal_actions/mealActions";

export class MealsPage extends Component {
  componentDidMount() {
    this.props.getMeals();
  }

  onDelete = id => {
    this.props.deleteMeals(id);
  };

  render() {
    const { meals } = this.props.meal;
    return (
      <div>
        <MealList meals={meals} />
        <MealAdd />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  {
    getMeals,
    addMeal
  }
)(MealsPage);
