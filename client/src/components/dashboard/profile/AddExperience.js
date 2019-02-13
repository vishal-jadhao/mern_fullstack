import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { addExperience } from "../../../actions/profileAction";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  CustomInput
} from "reactstrap";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
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
      company,
      title,
      location,
      from,
      to,
      description,
      current,
      disabled
    } = this.state;
    return (
      <div className="add-experience">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <div className="back-button">
              <FontAwesomeIcon
                onClick={this.goBackHandler}
                icon="arrow-alt-circle-left"
                className="mb-3"
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </div>
            <h4 className="mb-4">Add Experience</h4>
            <p>Enter your job or position description</p>
            <small className="d-block pb-3">* required fields</small>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <Label for="title">
                  *Title &nbsp;
                  <FormFeedback>{errors.title}</FormFeedback>
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Job Title"
                  value={title}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="company">
                  *Company &nbsp;
                  <FormFeedback>{errors.company}</FormFeedback>
                </Label>
                <Input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Enter Your Company Name"
                  value={company}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
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
                <Label for="from">
                  *From Date &nbsp;
                  <FormFeedback>{errors.from}</FormFeedback>
                </Label>
                <Input
                  type="date"
                  name="from"
                  id="from"
                  placeholder="From Date"
                  value={from}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="to">To Date</Label>
                <Input
                  type="date"
                  name="to"
                  id="to"
                  placeholder="To Date"
                  value={to}
                  onChange={this.onChange}
                  disabled={disabled}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  id="current"
                  label="Current"
                  onChange={this.onCheck}
                  value={current}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Job Description</Label>
                <Input
                  type="textarea"
                  id="description"
                  name="description"
                  placeholder="Job Description"
                  onChange={this.onChange}
                  value={description}
                />
              </FormGroup>
              <div className="form-button">
                <Button type="submit">Add Experience</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  // Input Change
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Input on check
  onCheck = e => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  };

  // Go Back Handler
  goBackHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  submitHandler = event => {
    event.preventDefault();
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = this.state;
    const expData = {
      title: title,
      company: company,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description
    };
    // Call action
    const { addExperience, history } = this.props;
    addExperience(expData, history);
  };
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
