import React from "react";
import { Route } from "react-router-dom";
import Profile from "./profile/Profile";
import DashboardNavbar from "./DashboardNavbar";
import DashboardHome from "./DashboardHome";
import CreateProfile from "./profile/CreateProfile";
import EditProfile from "./profile/EditProfile";
import AddExperience from "./profile/AddExperience";
import AddEducation from "./profile/AddEducation";

const DashboardApp = ({ match }) => {
  return (
    <article>
      <section className="dashboard-app container">
        <DashboardNavbar match={match} />
        <div className="dashboard-routes">
          <Route exact path={`${match.url}/`} component={DashboardHome} />
          <Route path={`${match.url}/profile`} component={Profile} />
          <Route path={`${match.url}/edit-profile`} component={EditProfile} />
          <Route
            path={`${match.url}/add-experience`}
            component={AddExperience}
          />
          <Route path={`${match.url}/add-education`} component={AddEducation} />
          <Route
            path={`${match.url}/create-profile`}
            component={CreateProfile}
          />
        </div>
      </section>
    </article>
  );
};

export default DashboardApp;
