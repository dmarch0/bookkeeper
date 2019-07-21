import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import MainWrapper from "./components/common/MainWrapper";
import Login from "./components/auth/Login";

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

const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <Router>
          <Route exact path="/login" component={Login} />
        </Router>
      </MainWrapper>
    </Provider>
  );
};

export default App;
