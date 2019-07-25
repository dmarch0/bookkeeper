import { combineReducers } from "redux";
import { reducer } from "redux-form";

import authReducer from "./authReducer";
import formErrorReducer from "./formErrorReducer";
import booksReducer from "./booksReducer";
import languageReducer from "./languageReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
  test: () => 5,
  form: reducer,
  auth: authReducer,
  formError: formErrorReducer,
  books: booksReducer,
  language: languageReducer,
  filter: filterReducer
});
