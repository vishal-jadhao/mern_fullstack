import { GET_ERRORS } from "./types";
import Axios from "axios";

// This file contains auth action

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
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
