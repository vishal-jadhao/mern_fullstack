import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { email, password, errors } = this.state;
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
                <Media heading>Sign in to your account</Media>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                </p>
                <Form>
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
                  <div className="form-button">
                    <Button onClick={this.submitHandler}>Login</Button>
                  </div>
                  <br />
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register Here</Link>
                  </p>
                </Form>
              </Media>
            </Media>
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
    const { email, password, errors } = this.state;
    const user = {
      email: email,
      password: password
    };
    const { loginUser } = this.props;
    // Call login user action
    loginUser(user);
  };
}

// props validation
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
