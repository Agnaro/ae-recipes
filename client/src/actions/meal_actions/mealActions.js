import {
  GET_MEALS,
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  MEALS_LOADING
} from "./types";
import axios from "axios";

export const getMeals = () => dispatch => {
  dispatch(setMealsLoading());
  axios.get("/api/meals").then(res => {
    dispatch({
      type: GET_MEALS,
      payload: res.data
    });
  });
};

export const addMeal = meal => dispatch => {
  axios.post("/api/meals", meal).then(res => {
    dispatch({
      type: ADD_MEAL,
      payload: res.data
    });
  });
};

export const deleteMeal = id => dispatch => {
  axios.delete("/api/meals/" + id).then(params => {
    dispatch({ type: DELETE_MEAL, payload: id });
  });
};

export const editMeal = meal => dispatch => {
  axios.put("/api/meals/" + meal._id, meal).then(res => {
    dispatch({
      type: EDIT_MEAL,
      payload: res.data
    });
  });
};

export const setMealsLoading = () => {
  return {
    type: MEALS_LOADING
  };
};
