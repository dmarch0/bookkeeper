import {
  GET_BOOKS,
  BOOKS_LOADING,
  BOOKS_ERROR,
  ADD_GHOST
} from "../actions/types";

const initialState = { books: [], loading: false, error: null };

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LOADING:
      return { ...state, loading: true };
    case GET_BOOKS:
      return { loading: false, books: action.payload, error: null };
    case BOOKS_ERROR:
      return { loading: false, books: [], error: action.payload };
    case ADD_GHOST:
      const currentGhost = state.books.find(item => item.ghosted);
      if (!currentGhost) {
        const newBooks = [...state.books].filter(
          book => book._id !== action.payload.item._id
        );
        const book = { ...action.payload.item };
        book.ghosted = true;
        book.status = action.payload.location;
        newBooks.push(book);
        return { ...state, books: newBooks };
      }
      if (currentGhost.status === action.payload.location) {
        return { ...state };
      } else {
        const newBooks = [...state.books].filter(book => !book.ghosted);
        const book = { ...action.payload.item };
        book.ghosted = true;
        book.status = action.payload.location;
        newBooks.push(book);
        return { ...state, books: newBooks };
      }
    default:
      return state;
  }
};

export default booksReducer;
