import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../../actions/profileAction";
import ProfileActions from "./ProfileActions";
import ViewProfile from "./ViewProfile";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getCurrentProfile } = this.props;

    // Get current profile
    getCurrentProfile();
  }

  render() {
    const { profile } = this.props;
    const userProfile = profile.profile;
    const loading = profile.loading;
    let profileContent;
    if (userProfile === null || loading) {
      profileContent = "Loading...";
    } else if (Object.keys(userProfile).length > 0) {
      // Display user profile
      profileContent = (
        <React.Fragment>
          <ProfileActions />
          <ViewProfile profile={userProfile} />
        </React.Fragment>
      );
    } else {
      profileContent = (
        <p>
          <span>You have not created profile yet, please create one&nbsp;</span>
          <Link to={`/dashboard/create-profile`}>Here</Link>
        </p>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-12">{profileContent}</div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
