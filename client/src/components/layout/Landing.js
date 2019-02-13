import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <article className="landing-page">
        <section className="hero-section">
          <h1>A Social Network for Developers!</h1>
          <div className="hero-buttons">
            <h2>Success starts with a great product</h2>
            <div className="get-started-buttons">
              <Link to="/register" className="btn btn-light">
                Get Started Dev
              </Link>
              <Link to="/login" className="btn btn-light login">
                Already a Member
              </Link>
            </div>
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
        <section className="container foundation-section">
          <div className="row">
            <div className="col-sm-4">
              <h4>A foundation built for scale and forsight</h4>
            </div>
            <div className="col-sm-8">
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
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(Landing);
