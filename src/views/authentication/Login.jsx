import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Login.scss";
import {
  authenticateSystemAdmin,
  authenticateSystemUser, resetWrongCredentials
} from "../../store/modules/current_session/actions";
import { FormGroup, Label, Input } from "reactstrap";
class Login extends Component {
  state = {
    attemptedEmail: "",
    attemptedPassword: "",
    isAdmin: false,
    isStaff: true,
    loginHasError: false,
    loginErrorMessage: ""
  };

  componentDidUpdate(prevProps) {
    /* ---------------------------------------------------------------------------------------------------------------------- */

    /*PAGE NAVIGATION LOGIC*/
    if (this.props.isSessionActive !== prevProps.isSessionActive) {
      if (this.props.isSessionActive && this.state.isAdmin) {
        this.props.history.push("/admin_home");
      } else if (this.props.isSessionActive && this.state.isStaff) {
        this.props.history.push("/user_home");
      }
    }

    /* ---------------------------------------------------------------------------------------------------------------------- */

    if (
      this.props.hasWrongLoginCredentials !== prevProps.hasWrongLoginCredentials
    ) {
      if (this.props.hasWrongLoginCredentials) {
        this.setState({
          loginHasError: true,
          loginErrorMessage: "Wrong username or password"
        });
      }
    }
  }

  handleAnyTextFieldTouched = () => {
    this.props.resetWrongCredentials();
    this.setState({ loginHasError: false, loginErrorMessage: "" });
  };

  handleSubmit = event => {
    event.preventDefault();
    const payload = {
      AttemptedEmail: this.state.attemptedEmail,
      AttemptedPassword: this.state.attemptedPassword,
      AttemptedRoleCode: this.state.isAdmin ? '1' : '2'
    };

    if (this.state.isAdmin) {
      this.props.authenticateSystemAdmin(payload);
    } else if (this.state.isStaff) {
      this.props.authenticateSystemUser(payload);
    }
  };

  handleChange = event => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState({
      ...newState
    });
  };

  handleAdminRadioClicked = () => {
    if (this.state.isStaff) {
      this.setState({ isStaff: false });
    }
    this.setState({ isAdmin: true });
  };

  handleStaffRadioClicked = () => {
    if (this.state.isAdmin) {
      this.setState({ isAdmin: false });
    }
    this.setState({ isStaff: true });
  };

  render() {
    return (
      <div>
        <div className="container user-login-card">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="login-panel panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Sign In</h3>
                </div>
                <div className="panel-body">
                  <form
                    action=""
                    method="POST"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <fieldset>
                      <div className="form-group">
                        <input
                          onClick={() => {
                            this.handleAnyTextFieldTouched();
                          }}
                          name="attemptedEmail"
                          className={
                            this.state.loginHasError
                              ? "form-control login__text-area-error"
                              : "form-control"
                          }
                          placeholder="Email"
                          value={this.state.attemptedEmail}
                          type="text"
                          onChange={this.handleChange}
                          autoFocus
                          required={true}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          onClick={() => {
                            this.handleAnyTextFieldTouched();
                          }}
                          name="attemptedPassword"
                          className={
                            this.state.loginHasError
                              ? "form-control login__text-area-error"
                              : "form-control"
                          }
                          placeholder="Password"
                          value={this.state.attemptedPassword}
                          type="password"
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-lg btn-success btn-block"
                      >
                        Sign In
                      </button>
                      <p
                        className={
                          this.state.loginHasError
                            ? "login__error-text"
                            : "login__hide"
                        }
                      >
                        {this.state.loginErrorMessage}
                      </p>
                    </fieldset>
                  </form>
                </div>
              </div>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    checked={this.state.isAdmin}
                    onClick={this.handleAdminRadioClicked}
                  />{" "}
                  As Admin
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    checked={this.state.isStaff}
                    onClick={this.handleStaffRadioClicked}
                  />{" "}
                  As Staff
                </Label>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  authenticateSystemUser: PropTypes.func.isRequired,
  resetWrongCredentials: PropTypes.func.isRequired,
  authenticateSystemAdmin: PropTypes.func.isRequired,
  isSessionActive: PropTypes.bool.isRequired,
  hasWrongLoginCredentials: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isSessionActive: state.current_session.isSessionActive,
  hasWrongLoginCredentials: state.current_session.hasWrongLoginCredentials
});

const mapDispatchToProps = dispatch => ({
  authenticateSystemUser: payload => dispatch(authenticateSystemUser(payload)),
  authenticateSystemAdmin: payload => dispatch(authenticateSystemAdmin(payload)),
  resetWrongCredentials: () => dispatch(resetWrongCredentials())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
