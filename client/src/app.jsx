import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "bootstrap";
import "./app.scss";

// Font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import Routes from "./components/routes/Routes";

class AppContainer extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <Routes />
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}
export default AppContainer;
