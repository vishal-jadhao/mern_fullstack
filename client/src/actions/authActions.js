// This file contains auth action
import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register user
export const registerUser = (userData, history) => dispatch => {
  Axios.post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login user
export const loginUser = userData => dispatch => {
  Axios.post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;

      // Save token to local storage
      if (window.localStorage) {
        localStorage.setItem("jwtToken", token);
      }

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwtDecode(token);

      // dispatch action to Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout user
export const logoutUser = history => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for every request
  setAuthToken(false);

  // Set current user to {} which will isAuthenticated to false
  dispatch(setCurrentUser({}));

  // Redirect to login page
  if (history) {
    history.push("/login");
  }
};
