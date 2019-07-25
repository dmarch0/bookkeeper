import { ADD_TO_FILTER, REMOVE_FROM_FILTER, CLEAR_FILTER } from "./types";

export const addToFilter = tag => {
  return {
    type: ADD_TO_FILTER,
    payload: tag
  };
};

export const removeFromFilter = tag => {
  return {
    type: REMOVE_FROM_FILTER,
    payload: tag
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER
  };
};
