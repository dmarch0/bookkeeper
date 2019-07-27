import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";

import reducers from "./reducers";
import MainWrapper from "./components/common/MainWrapper";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Dashboard from "./components/books/Dashboard";
import setAuthToken from "./utils/setAuthToken";
import { SET_CURRENT_USER, LOGOUT_USER } from "./actions/types";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");

  //Set axios default
  setAuthToken(token);

  //Set auth state
  const decoded = jwt_decode(token);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });

  //Check if expired
  const currentTime = Date.now / 1000;
  if (currentTime > decoded.exp) {
    //Remove axios default
    setAuthToken(false);

    //Clear auth state
    store.dispatch({ type: LOGOUT_USER });

    //Remove from local storage
    localStorage.removeItem("token");

    //Redirect
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
          <Switch>
            <ProtectedRoute exact path="/books" component={Dashboard} />
          </Switch>
        </Router>
      </MainWrapper>
    </Provider>
  );
};

export default App;
