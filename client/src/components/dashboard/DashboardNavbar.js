import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class DashboardNavbar extends Component {
  render() {
    const { match } = this.props;
    return (
      <Navbar color="light" light expand="md" className="dashboard-navbar">
        <Nav navbar>
          <NavItem>
            <Link to="/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to={`${match.url}/profile`}>Profile</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

DashboardNavbar.propTypes = {
  match: PropTypes.object.isRequired
};

export default DashboardNavbar;
