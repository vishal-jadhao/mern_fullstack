import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../../actions/profileAction";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  Media
} from "reactstrap";
import ProfessionalStatus from "./ProfessionalStatus";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      youtube: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const {
      errors,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      youtube,
      linkedin,
      instagram,
      displaySocialInputs
    } = this.state;

    return (
      <div className="create-profile">
        <h1>Create your profile</h1>
        <p>Lets get some information to make your profile stand out</p>
        <div className="row">
          <div className="col-sm-8 m-auto">
            <small className="d-block pb-3">* required fields</small>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <Label for="handle">
                  *Profile Handle &nbsp;
                  <FormFeedback>{errors.handle}</FormFeedback>
                </Label>
                <Input
                  type="text"
                  name="handle"
                  id="handle"
                  placeholder="Enter Your Profile Handle"
                  value={handle}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="profession">
                  *Select Professional Status &nbsp;
                  <FormFeedback>{errors.status}</FormFeedback>
                </Label>
                <Input
                  type="select"
                  name="status"
                  id="profession"
                  value={status}
                  onChange={this.onChange}
                >
                  <ProfessionalStatus />
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="company">Company</Label>
                <Input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Company Name"
                  value={company}
                  onChange={this.onChange}
                />
                <small>Your own company name or one you work for</small>
              </FormGroup>
              <FormGroup>
                <Label for="location">location &nbsp;</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  value={location}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="website">Website</Label>
                <Input
                  type="text"
                  name="website"
                  id="website"
                  placeholder="Website Address"
                  value={website}
                  onChange={this.onChange}
                />
                <small>Your own website address or your company website</small>
              </FormGroup>
              <FormGroup>
                <Label for="skills">
                  *Skills &nbsp;
                  <FormFeedback>{errors.skills}</FormFeedback>
                </Label>
                <Input
                  type="text"
                  name="skills"
                  id="skills"
                  placeholder="Skills"
                  value={skills}
                  onChange={this.onChange}
                />
                <small>
                  Please use comma seperated values (eg. Html, Css, Node, React
                  etc)
                </small>
              </FormGroup>
              <FormGroup>
                <Label for="githubUsername">Github Username &nbsp;</Label>
                <Input
                  type="text"
                  name="githubUsername"
                  id="githubUsername"
                  placeholder="Github Username"
                  value={githubUsername}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bio">Bio &nbsp;</Label>
                <Input
                  type="textarea"
                  name="bio"
                  id="bio"
                  placeholder="A short bio of yourself"
                  value={bio}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  onClick={this.toggleSocialLinks}
                  className="add-social-links"
                >
                  <FontAwesomeIcon icon="plus-circle" />
                  Add social network links
                </Button>
              </FormGroup>
              {displaySocialInputs && (
                <div className="social-links">
                  <FormGroup>
                    <FormFeedback>{errors.linkedin}</FormFeedback>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FontAwesomeIcon
                            style={{ width: "20px" }}
                            icon={["fab", "linkedin"]}
                          />
                        </div>
                      </div>
                      <Input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn url"
                        value={linkedin}
                        onChange={this.onChange}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <FormFeedback>{errors.youtube}</FormFeedback>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FontAwesomeIcon
                            style={{ width: "20px" }}
                            icon={["fab", "youtube"]}
                          />
                        </div>
                      </div>
                      <Input
                        type="text"
                        name="youtube"
                        placeholder="Youtube channel url"
                        value={youtube}
                        onChange={this.onChange}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <FormFeedback>{errors.instagram}</FormFeedback>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FontAwesomeIcon
                            style={{ width: "20px" }}
                            icon={["fab", "instagram"]}
                          />
                        </div>
                      </div>
                      <Input
                        type="text"
                        name="instagram"
                        placeholder="Instagram Username"
                        value={instagram}
                        onChange={this.onChange}
                      />
                    </div>
                  </FormGroup>
                </div>
              )}
              <div className="form-button">
                <Button type="submit">Create Profile</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  // Toggle social links
  toggleSocialLinks = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  // create profile handler
  submitHandler = event => {
    event.preventDefault();
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      youtube,
      linkedin,
      instagram,
      errors
    } = this.state;

    const profileData = {
      handle: handle,
      company: company,
      website: website,
      location: location,
      status: status,
      skills: skills,
      githubUsername: githubUsername,
      bio: bio,
      youtube: youtube,
      linkedin: linkedin,
      instagram: instagram
    };

    const { createProfile, history } = this.props;

    // call create profile action
    createProfile(profileData, history);
  };

  // Input Change
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  {
    createProfile
  }
)(withRouter(CreateProfile));
