import {
  LOGIN,
  LOGOUT,
  USER_ERROR,
  USER_LOADING
} from "../actions/user_actions/types";

const initialState = {
  user: {},
  loading: false,
  error: false
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
    case LOGOUT:
      return {
        ...state,
        user: {}
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
        error: true
      };
    default:
      return state;
  }
}
