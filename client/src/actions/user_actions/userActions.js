import { LOGIN, LOGOUT, USER_ERROR, USER_LOADING } from "./types";
import axios from "axios";

export const login = user => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(setLoading());
    axios
      .post("/api/users/login", user)
      .then(res => {
        dispatch({
          type: LOGIN,
          payload: {
            token: res.data.token
          }
        });
        resolve(res.data.token);
      })
      .catch(err => {
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
