import {
  LOGIN,
  LOGOUT,
  USER_ERROR,
  USER_LOADING,
  CLEAR_ERROR,
  GET_USER
} from "../actions/user_actions/types";

const initialState = {
  user: {},
  loading: false,
  error: false,
  errorMsg: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        error: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: false,
        errorMsg: ""
      };
    default:
      return state;
  }
}
