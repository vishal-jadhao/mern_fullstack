import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
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
      </article>
    );
  }
}

export default Landing;
