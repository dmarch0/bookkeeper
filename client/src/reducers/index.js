import { combineReducers } from "redux";
import { reducer } from "redux-form";

export default combineReducers({
  test: () => 5,
  form: reducer
});
