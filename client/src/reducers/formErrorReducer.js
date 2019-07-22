import { FORM_ERROR } from "../actions/types";

const initilaState = {};

const formErrorReducer = (state = initilaState, action) => {
  switch (action.type) {
    case FORM_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default formErrorReducer;
