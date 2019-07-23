import { GET_BOOKS, BOOKS_LOADING, BOOKS_ERROR, ADD_GHOST } from "./types";
import axios from "../utils/axiosConfig";

export const getBooks = () => dispatch => {
  dispatch({ type: BOOKS_LOADING });
  axios({
    method: "get",
    url: "/api/users/books",
    mode: "no-cors"
  })
    .then(books => dispatch({ type: GET_BOOKS, payload: books.data }))
    .catch(err => dispatch({ type: BOOKS_ERROR, payload: err.response.data }));
};

export const setBookStatus = (id, status) => dispatch => {
  dispatch({ type: BOOKS_LOADING });
  axios({
    method: "post",
    url: `/api/users/books/${id}`,
    mode: "no-cors",
    data: { status }
  })
    .then(books => dispatch({ type: GET_BOOKS, payload: books.data }))
    .catch(err => dispatch({ type: BOOKS_ERROR, payload: err.response.data }));
};

export const addGhost = (location, item) => {
  return { type: ADD_GHOST, payload: { location, item } };
};

export const setRating = (id, rating) => dispatch => {
  dispatch({ type: BOOKS_LOADING });
  axios({
    method: "post",
    url: `/api/users/books/rating/${id}`,
    mode: "no-cors",
    data: { rating }
  })
    .then(books => dispatch({ type: GET_BOOKS, payload: books.data }))
    .catch(err => dispatch({ type: BOOKS_ERROR, payload: err.response.data }));
};

export const deleteBook = id => dispatch => {
  dispatch({ type: BOOKS_LOADING });
  axios({
    method: "delete",
    url: `/api/users/books/${id}`,
    mode: "no-cors"
  })
    .then(books => dispatch({ type: GET_BOOKS, payload: books.data }))
    .catch(err => dispatch({ type: BOOKS_ERROR, payload: err.response.data }));
};

export const addBook = formValues => dispatch => {
  dispatch({ type: BOOKS_LOADING });
  axios({
    method: "post",
    url: `/api/users/books/new`,
    mode: "no-cors",
    data: formValues
  })
    .then(books => dispatch({ type: GET_BOOKS, payload: books.data }))
    .catch(err => dispatch({ type: BOOKS_ERROR, payload: err.response.data }));
};
