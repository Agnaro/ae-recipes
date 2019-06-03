import {
  LOGIN,
  LOGOUT,
  USER_ERROR,
  USER_LOADING,
  CLEAR_ERROR,
  GET_USER
} from "./types";
import axios from "axios";

export const getUser = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/users")
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data.user
      });
    })
    .catch(err => {
      if (typeof err === "object") {
        if (err.response.status !== 401) {
          dispatch(setError(err.response.data.msg));
        }
      } else {
        dispatch(setError(err));
      }
    });
};

export const login = user => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(setLoading());
    axios
      .post("/api/users/login", user)
      .then(res => {
        dispatch({
          type: LOGIN,
          payload: {
            id: res.data.id,
            token: res.data.token
          }
        });
        resolve(res.data.token);
      })
      .catch(err => {
        if (typeof err === "object") {
          err = err.response.data.msg;
        }
        dispatch(setError(err));
        reject(err);
      });
  });
};

export const logout = () => dispatch => {
  axios.get("/api/users/logout").then(res => {
    dispatch({
      type: LOGOUT
    });
  });
};

export const setLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const setError = err => {
  return {
    type: USER_ERROR,
    payload: err
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
