// Set auth header
import Axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    Axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete the auth header
    delete Axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
