import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import store from "../store";


class Navbar extends Component {
  // If user clicks logout button, send request to server to logout the user
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  userName = store.getState().auth.user.name;
  

  render() {
    return (
      <div className="nav-bar">
        {localStorage.jwtToken ? 
          <>
            <p>Logged in as {this.userName}</p>
            <div className="col s6" style={{paddingLeft: "0px"}}>
            <Link
                  to="/"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large"
              >
                Home
              </Link>
              <Link
                  to="/stats"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large"
              >
                Stats
              </Link>
              <Link
                  to="/leaderboard"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large"
              >
                Leaderboard
              </Link>
            </div>
            <button
              style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-outline-danger"
              >
              Logout
            </button>
          </>
          :
          <>
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
          </>
        }
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