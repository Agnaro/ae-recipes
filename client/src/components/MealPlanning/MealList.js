import React, { Component } from "react";
import { Table } from "reactstrap";
import Meal from "./Meal";
import PropTypes from "prop-types";

export class MealList extends Component {
  render() {
    var { meals } = this.props;
    return (
      <div>
        <Table className="table-striped table-bordered table-middle">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Meal</th>
              <th scope="col">Recipe</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, i) => {
              return <Meal key={i} meal={meal} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

MealList.propTypes = {
  meals: PropTypes.array.isRequired
};

export default MealList;
