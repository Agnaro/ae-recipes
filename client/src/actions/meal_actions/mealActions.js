import {
  GET_MEALS,
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  MEALS_LOADING
} from "./types";
import axios from "axios";

export const getMeals = () => (dispatch, getState) => {
  dispatch(setMealsLoading());

  var token = getState().user.user.token;
  var headers = {};
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  axios.get("/api/meals", { headers: headers }).then(res => {
    dispatch({
      type: GET_MEALS,
      payload: res.data
    });
  });
};

export const addMeal = meal => (dispatch, getState) => {
  var token = getState().user.user.token;
  var headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  axios.post("/api/meals", meal, { headers: headers }).then(res => {
    dispatch({
      type: ADD_MEAL,
      payload: res.data
    });
  });
};

export const deleteMeal = id => (dispatch, getState) => {
  var token = getState().user.user.token;
  var headers = {};
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  axios.delete("/api/meals/" + id, { headers: headers }).then(params => {
    dispatch({ type: DELETE_MEAL, payload: id });
  });
};

export const editMeal = meal => (dispatch, getState) => {
  var token = getState().user.user.token;
  var headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  axios.put("/api/meals/" + meal._id, meal, { headers: headers }).then(res => {
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
