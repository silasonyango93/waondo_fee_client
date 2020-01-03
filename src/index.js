import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { render } from "react-dom";
import "./index.css";
import "bulma/css/bulma.css";
import App from "./App";
import createStore from "./store/createStore";
import * as serviceWorker from "./serviceWorker";

const store = createStore();
const history = createHistory();
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement
);
serviceWorker.unregister();
