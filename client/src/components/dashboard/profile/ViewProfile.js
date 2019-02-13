import React from "react";
import { Jumbotron, Media } from "reactstrap";
import PropTypes from "prop-types";

const ViewProfile = ({ profile }) => {
  return (
    <div className="profile-view">
      <Jumbotron>
        <div className="row profile-header">
          <div className="col-sm-10 m-auto">
            <Media>
              <Media left href="#">
                <img
                  src={profile.user.avatar}
                  style={{
                    widht: "100px",
                    height: "100px",
                    marginRight: "40px"
                  }}
                  className="rounded-circle"
                />
              </Media>
              <Media body>
                <p className="username">
                  <span>{profile.user.name}</span>
                </p>
                <p className="status-details">
                  {profile.status},&nbsp;{profile.company}
                </p>
                <p className="location">{profile.location}</p>
              </Media>
              <Media right>
                <span>Testing</span>
              </Media>
            </Media>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

ViewProfile.propType = {
  profile: PropTypes.object.isRequired
};

export default ViewProfile;
