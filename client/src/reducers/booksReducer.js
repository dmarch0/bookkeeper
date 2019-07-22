import {
  GET_BOOKS,
  BOOKS_LOADING,
  BOOKS_ERROR,
  DRAG_ENTER,
  DRAG_END
} from "../actions/types";

const initialState = { books: [], loading: false, error: null };

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LOADING:
      return { loading: true, books: [], error: null };
    case GET_BOOKS:
      return { loading: false, books: action.payload, error: null };
    case BOOKS_ERROR:
      return { loading: false, books: [], error: action.payload };
    case DRAG_ENTER:
      const newBooks = state.books.filter(book => !book.ghosted);
      const book = action.payload.item;
      book.status = action.payload.location;
      book.ghosted = true;
      newBooks.push(book);
      return { ...state, books: newBooks };
    case DRAG_END:

    default:
      return state;
  }
};

export default booksReducer;
