import { GET_ERRORS } from "../actions/types";

const initilaState = {};

const errorReducer = (state = initilaState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
