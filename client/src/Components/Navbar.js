import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <div className="col s6">
        <Link
            to="/register"
            style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
            }}
            className="btn btn-large"
        >
            Register
        </Link>
        </div>
        <div className="col s6">
        <Link
            to="/login"
            style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
            }}
            className="btn btn-large"
        >
            Log In
        </Link>
        </div>
        <button
          style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
          Logout
        </button>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);