import {
  ADD_TO_FILTER,
  REMOVE_FROM_FILTER,
  CLEAR_FILTER
} from "../actions/types";

const initialState = [];

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FILTER:
      if (state.filter(tag => tag.text === action.payload.text).length > 0) {
        return state;
      } else {
        return [...state, action.payload];
      }
    case REMOVE_FROM_FILTER:
      return state.filter(tag => tag.text !== action.payload.text);
    case CLEAR_FILTER:
      return [];
    default:
      return state;
  }
};

export default filterReducer;
