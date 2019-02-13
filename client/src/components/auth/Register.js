import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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

// auth actions
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { name, email, password, confirmPassword, errors } = this.state;
    return (
      <article className="auth-page">
        <section className="auth-section">
          <div className="auth-form">
            <Media>
              <Media left href="#" className="col-5">
                <Media
                  object
                  src="./images/auth.jpg"
                  alt="Generic placeholder image"
                />
              </Media>
              <Media body className="col-7">
                <Media heading>Create Your Account</Media>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                </p>
                <Form onSubmit={this.submitHandler}>
                  <FormGroup>
                    <Label for="formName">
                      Name &nbsp;
                      <FormFeedback>{errors.name}</FormFeedback>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="formName"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="formEmail">
                      Email &nbsp;
                      <FormFeedback>{errors.email}</FormFeedback>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="formEmail"
                      placeholder="Email Address"
                      value={email}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="formPassword">
                      Password &nbsp;
                      <FormFeedback>{errors.password}</FormFeedback>
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="formPassword"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="formConfirmPassword">
                      Confirm Password &nbsp;
                      <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    </Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="formConfirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <div className="form-button">
                    <Button>Register</Button>
                  </div>
                </Form>
              </Media>
            </Media>
          </div>
        </section>
        <section className="container with-padding">
          <div className="row">
            <div className="col-sm">
              <h2>Understand every step of the way</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                est tellus, pulvinar ac iaculis vel, varius eu arcu tor
                vestibulum.
              </p>
            </div>
            <div className="col-sm">
              <h2>Build faster with instant answers</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                est tellus, pulvinar ac iaculis vel, varius eu arcu tor
                vestibulum.
              </p>
            </div>
            <div className="col-sm">
              <h2>Unlock insights for everyone</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                est tellus, pulvinar ac iaculis vel, varius eu arcu tor
                vestibulum.
              </p>
            </div>
          </div>
        </section>
      </article>
    );
  }

  // Input Change
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Form submit handler
  submitHandler = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    const newUser = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    // this is an action dispatch
    const { registerUser, history } = this.props;
    registerUser(newUser, history);
  };
}

// props validation
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Get state from store
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
