import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App";
import Routes from "./Routes";

// redux
import { Provider } from "react-redux";
import store from "./middleware/store";

export const browserHistory = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
