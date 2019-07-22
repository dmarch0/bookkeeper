import { GET_BOOKS, BOOKS_LOADING, BOOKS_ERROR } from "../actions/types";

const initialState = { books: [], loading: false, error: null };

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LOADING:
      return { ...state, loading: true };
    case GET_BOOKS:
      return { loading: false, books: action.payload, error: null };
    case BOOKS_ERROR:
      return { loading: false, books: [], error: action.payload };
    default:
      return state;
  }
};

export default booksReducer;
