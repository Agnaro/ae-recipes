import {
  GET_MEALS,
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  MEALS_LOADING
} from "../actions/meal_actions/types";

const initialState = {
  meals: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload,
        loading: false
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter(meal => meal._id !== action.payload)
      };
    case ADD_MEAL:
      return {
        ...state,
        meals: [action.payload, ...state.meals]
      };
    case EDIT_MEAL:
      return {
        ...state,
        meals: state.meals.map(meal =>
          meal._id === action.payload._id ? action.payload : meal
        )
      };
    case MEALS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
