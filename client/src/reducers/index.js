import { combineReducers } from "redux";
import mealReducer from "./mealReducer";
import userReducer from "./userReducer";

export default combineReducers({
  meal: mealReducer,
  user: userReducer
});
