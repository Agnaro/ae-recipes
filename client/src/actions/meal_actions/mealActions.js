import {
  GET_MEALS,
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  MEALS_LOADING
} from "./types";

export const getMeals = () => dispatch => {
  dispatch(setMealsLoading());
  dispatch({
    type: GET_MEALS
  });
};

export const addMeal = meal => dispatch => {
  dispatch({
    type: ADD_MEAL,
    payload: meal
  });
};

export const deleteMeal = id => dispatch => {
  dispatch({ type: DELETE_MEAL, payload: id });
};

export const editMeal = meal => dispatch => {
  dispatch({
    type: EDIT_MEAL,
    payload: meal
  });
};

export const setMealsLoading = () => {
  return {
    type: MEALS_LOADING
  };
};
