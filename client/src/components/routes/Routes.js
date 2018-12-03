import React from "react";
import { Route } from "react-router-dom";

import Landing from "../layout/Landing.js";
import Register from "../auth/register";
import Login from "../auth/login";

export default function Routes() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </React.Fragment>
  );
}
