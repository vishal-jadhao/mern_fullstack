// This file contains profile action creators

import Axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  //Get profile request
  Axios.get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  // call the api
  Axios.post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard/profile");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  Axios.post("/api/profile/experience", expData)
    .then(res => {
      history.push("/dashboard/profile");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Delete an account
