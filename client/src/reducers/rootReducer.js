// Contains all reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});

export default reducers;
