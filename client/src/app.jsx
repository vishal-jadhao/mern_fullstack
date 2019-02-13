import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "bootstrap";
import "./app.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Icons from "./utils/fontAwesomeLibrary";
library.add(fab, Icons());

import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import Routes from "./components/routes/Routes";

import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileAction";

// set current user for every http request
if (window.localStorage) {
  // jwt token from localstorage
  const token = localStorage.getItem("jwtToken");

  // Check for token
  if (token) {
    // Set token to Auth header
    setAuthToken(token);

    // Decode token to get user data
    const decoded = jwtDecode(token);

    // dispatch action to Set current user on store
    store.dispatch(setCurrentUser(decoded));

    // Logout user when token expires
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      store.dispatch(clearCurrentProfile());
      // redirect to login page
      window.location.href = "/login";
    }
  }
}

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
