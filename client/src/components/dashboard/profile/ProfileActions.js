import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileActions = () => {
  return (
    <React.Fragment>
      <div className="profile-actions" role="group">
        <Link
          to="/dashboard/edit-profile"
          className="btn btn-light btn-rounded-circle"
        >
          <FontAwesomeIcon icon="pen" />
          Edit Profile
        </Link>
        <Link
          to="/dashboard/add-experience"
          className="btn btn-light btn-rounded-circle"
        >
          <FontAwesomeIcon icon="briefcase" />
          Add Experience
        </Link>
        <Link
          to="/dashboard/add-education"
          className="btn btn-light btn-rounded-circle"
        >
          <FontAwesomeIcon icon="graduation-cap" />
          Add Education
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ProfileActions;
