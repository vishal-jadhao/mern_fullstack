import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = event => {
    event.preventDefault();
    const { logoutUser, history, clearCurrentProfile } = this.props;
    // call logout action
    logoutUser(history);

    // call clear current profile
    clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <div className="username">
            <img
              src={user.avatar}
              style={{
                widht: "25px",
                height: "25px",
                marginRight: "6px",
                verticalAlign: "middle"
              }}
              title="You must have gravatar connected to your email."
              className="rounded-circle"
            />
            <strong>{user.name}</strong>
          </div>
        </NavItem>
        <NavItem>
          <Link to="/" className="nav-link" onClick={this.handleLogout}>
            <span>Logout</span>
          </Link>
        </NavItem>
      </Nav>
    );

    const guestLink = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/register" className="nav-link">
            <span>Register</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/login" className="nav-link">
            <span>Login</span>
          </Link>
        </NavItem>
      </Nav>
    );

    return (
      <header>
        <Navbar expand="md" fixed="top">
          <Link to="/" className="navbar-brand nav-link">
            Dev Connector
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? authLink : guestLink}
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile
  }
)(withRouter(Header));
