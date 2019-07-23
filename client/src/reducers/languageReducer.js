import { SET_LANGUAGE } from "../actions/types";

const initilaState = false;

const languageReducer = (state = initilaState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return !state;
    default:
      return state;
  }
};

export default languageReducer;
