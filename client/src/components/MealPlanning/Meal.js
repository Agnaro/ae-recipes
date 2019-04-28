import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import MealEdit from "./MealEdit";
import { connect } from "react-redux";
import { deleteMeal } from "../../actions/meal_actions/mealActions";

export class Meal extends Component {
  onDeleteClick = id => {
    this.props.deleteMeal(id);
  };

  render() {
    var { meal } = this.props;
    return (
      <React.Fragment>
        <tr>
          <td>{meal.day}</td>
          <td>{meal.type}</td>
          <td>{meal.name}</td>
          <td style={{ textAlign: "center" }}>
            <MealEdit meal={meal} />
          </td>
          <td>
            <Button
              color="link"
              className="meal-delete-img"
              onClick={this.onDeleteClick.bind(this, meal._id)}
            >
              <img
                src="/Trash-Email-Bin-512.png"
                height="20"
                className="meal-delete-img"
                alt="Delete"
              />
            </Button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

Meal.propTypes = {
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meals: state.meal
});

export default connect(
  mapStateToProps,
  { deleteMeal }
)(Meal);
