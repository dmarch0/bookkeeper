import jwt_decode from "jwt-decode";

import axios from "../utils/axiosConfig";
import { SET_CURRENT_USER, GET_ERRORS, LOGOUT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loginUser = (formValues, history) => dispatch => {
  axios({
    method: "post",
    mode: "no-cors",
    data: formValues,
    url: "/api/users/login"
  })
    .then(response => {
      //Get decoded data
      const decoded = jwt_decode(response.data.token);

      //Set axios default
      setAuthToken(response.data.token);

      //Set local storage
      localStorage.setItem("token", response.data.token);

      //Set auth state
      dispatch({ type: SET_CURRENT_USER, payload: decoded });

      //Redirect
      history.push("/books");
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};
