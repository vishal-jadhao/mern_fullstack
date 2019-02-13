import React from "react";
import { Route, Switch } from "react-router-dom";

// Private Route function
import PrivateRoute from "../privateRoutes/PrivateRoute";

import Landing from "../layout/Landing.js";
import Register from "../auth/register";
import Login from "../auth/login";
import DashboardApp from "../dashboard/DashboardApp.js";

export default function Routes() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Switch>
        <PrivateRoute path="/dashboard" component={DashboardApp} />
      </Switch>
    </React.Fragment>
  );
}
