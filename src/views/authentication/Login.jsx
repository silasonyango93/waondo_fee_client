import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  authenticateCompanyOwner,
  authenticateSystemAdmin,
  authenticateSystemUser,
  checkIfSystemAlreadyConfigured,
  configureSystemCompany,
  configureSystemEmploymentCategory,
  configureSystemOwnershipGroup,
  initialEmploymentCategoriesConfiguration,
  initialGenderConfiguration,
  runInitialSystemConfiguration
} from "../../store/modules/current_session/actions";
import { FormGroup, Label, Input } from "reactstrap";
import { getCompanyOwnersCompanyDetails } from "../../store/modules/company_owner_home/actions";
import {
  getAllCompanies,
  getAllRegisteredCompanyClients
} from "../../store/modules/admin_home/actions";
class Login extends Component {
  state = {
    attemptedEmail: "",
    attemptedPassword: "",
    isAdmin: false,
    isCompanyOwner: false,
    isStaff: true
  };

  componentDidMount() {
    this.props.checkIfSystemAlreadyConfigured();
    this.props.getAllRegisteredCompanyClients();
  }

  componentDidUpdate(prevProps) {
    const {
      configureSystemOwnershipGroup,
      initialConfigurations: {
        isSystemOwnershipGroupConfigured,
        isSystemCompanyConfigured,
        isInitialEmploymentCategoryConfigured,
        isMaleGenderConfigured,
        isFemaleGenderConfigured
      },
      configureSystemCompany,
      configureSystemEmploymentCategory,
      initialGenderConfiguration
    } = this.props;

    if (
      this.props.companyOwnersCompanyDetails !==
      prevProps.companyOwnersCompanyDetails
    ) {
      if (this.props.companyOwnersCompanyDetails) {
        this.props.history.push("/company_owner_home");
      }
    }


    /* ---------------------------------------------------------------------------------------------------------------------- */

    /*PAGE NAVIGATION LOGIC*/
    if (this.props.isSessionActive !== prevProps.isSessionActive) {
      if (this.props.isSessionActive && this.state.isAdmin) {
        this.props.history.push("/admin_home");
      } else if (this.props.isSessionActive && this.state.isCompanyOwner) {
        const paload = {
          companyOwnerId: this.props.companyOwnerId
        };
        this.props.getCompanyOwnersCompanyDetails(paload);
      } else if(this.props.isSessionActive && this.state.isStaff) {
        this.props.history.push("/user_home");
      }
    }

    /* ---------------------------------------------------------------------------------------------------------------------- */

    if (
      this.props.isCompanyAlreadyConfigured !==
      prevProps.isCompanyAlreadyConfigured
    ) {
      if (!this.props.isCompanyAlreadyConfigured) {
        const payload = {
          CompanyOwnershipGroupId: 1,
          OwnershipGroupName: "System Ownership Group"
        };
        configureSystemOwnershipGroup(payload);
      }
    }

    if (
      isSystemOwnershipGroupConfigured !==
      prevProps.initialConfigurations.isSystemOwnershipGroupConfigured
    ) {
      if (isSystemOwnershipGroupConfigured) {
        const payload = {
          CompanyId: 1,
          CompanyOwnershipGroupId: 1,
          CompanyName: "System Company"
        };
        configureSystemCompany(payload);
      }
    }

    if (
      isSystemCompanyConfigured !==
      prevProps.initialConfigurations.isSystemCompanyConfigured
    ) {
      if (isSystemCompanyConfigured) {
        const payload = {
          EmploymentCategoryId: 1,
          CompanyId: 1,
          CategoryDescription: "Unemployed"
        };
        configureSystemEmploymentCategory(payload);
      }
    }

    if (
      isInitialEmploymentCategoryConfigured !==
      prevProps.initialConfigurations.isInitialEmploymentCategoryConfigured
    ) {
      if (isInitialEmploymentCategoryConfigured) {
        const payload = {
          GenderId: 1,
          GenderDescription: "Male"
        };
        initialGenderConfiguration(payload);
      }
    }

    if (
      isMaleGenderConfigured !==
      prevProps.initialConfigurations.isMaleGenderConfigured
    ) {
      if (isMaleGenderConfigured) {
        const payload = {
          GenderId: 2,
          GenderDescription: "Female"
        };
        initialGenderConfiguration(payload);
      }
    }

    if (
      isFemaleGenderConfigured !==
      prevProps.initialConfigurations.isFemaleGenderConfigured
    ) {
      if (isFemaleGenderConfigured) {
        const payload = {
          ConfigId: 1,
          ConfigDescription: "INITIAL_DATABASE_CONFIGURATION_COMPLETE",
          ConfigStatus: 1
        };
        this.props.runInitialSystemConfiguration(payload);
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const payload = {
      AttemptedEmail: this.state.attemptedEmail,
      AttemptedPassword: this.state.attemptedPassword
    };

    if (this.state.isAdmin) {
      this.props.authenticateSystemAdmin(payload);
    } else if (this.state.isCompanyOwner) {
      this.props.authenticateCompanyOwner(payload);
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
    if (this.state.isCompanyOwner) {
      this.setState({ isCompanyOwner: false });
    } else if (this.state.isStaff) {
      this.setState({ isStaff: false });
    }
    this.setState({ isAdmin: true });
  };

  handleCompanyOwnerRadioClicked = () => {
    if (this.state.isAdmin) {
      this.setState({ isAdmin: false });
    } else if (this.state.isStaff) {
      this.setState({ isStaff: false });
    }
    this.setState({ isCompanyOwner: true });
  };

  handleStaffRadioClicked = () => {
    if (this.state.isAdmin) {
      this.setState({ isAdmin: false });
    } else if (this.state.isCompanyOwner) {
      this.setState({ isCompanyOwner: false });
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
                          name="attemptedEmail"
                          className="form-control"
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
                          name="attemptedPassword"
                          className="form-control"
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
                    checked={this.state.isCompanyOwner}
                    onClick={this.handleCompanyOwnerRadioClicked}
                  />{" "}
                  As Company Owner
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
  authenticateSystemAdmin: PropTypes.func.isRequired,
  authenticateCompanyOwner: PropTypes.func.isRequired,
  isSessionActive: PropTypes.bool.isRequired,
  isCompanyAlreadyConfigured: PropTypes.bool.isRequired,
  checkIfSystemAlreadyConfigured: PropTypes.func.isRequired,
  runInitialSystemConfiguration: PropTypes.func.isRequired,
  configureSystemOwnershipGroup: PropTypes.func.isRequired,
  configureSystemCompany: PropTypes.func.isRequired,
  configureSystemEmploymentCategory: PropTypes.func.isRequired,
  initialConfigurations: PropTypes.shape().isRequired,
  getCompanyOwnersCompanyDetails: PropTypes.func.isRequired,
  companyOwnerId: PropTypes.string.isRequired,
  companyOwnersCompanyDetails: PropTypes.shape().isRequired,
  getAllRegisteredCompanyClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSessionActive: state.current_session.isSessionActive,
  isCompanyAlreadyConfigured: state.current_session.isCompanyAlreadyConfigured,
  initialConfigurations: state.current_session.initialConfigurations,
  companyOwnerId: state.current_session.session_details.CompanyOwnerId,
  companyOwnersCompanyDetails:
    state.company_owner_home.companyOwnersCompanyDetails
});

const mapDispatchToProps = dispatch => ({
  authenticateSystemUser: payload => dispatch(authenticateSystemUser(payload)),
  authenticateSystemAdmin: payload =>
    dispatch(authenticateSystemAdmin(payload)),
  authenticateCompanyOwner: payload =>
    dispatch(authenticateCompanyOwner(payload)),
  checkIfSystemAlreadyConfigured: () =>
    dispatch(checkIfSystemAlreadyConfigured()),
  runInitialSystemConfiguration: payload =>
    dispatch(runInitialSystemConfiguration(payload)),
  configureSystemOwnershipGroup: payload =>
    dispatch(configureSystemOwnershipGroup(payload)),
  configureSystemCompany: payload => dispatch(configureSystemCompany(payload)),
  configureSystemEmploymentCategory: payload =>
    dispatch(configureSystemEmploymentCategory(payload)),
  initialGenderConfiguration: payload =>
    dispatch(initialGenderConfiguration(payload)),
  getCompanyOwnersCompanyDetails: payload =>
    dispatch(getCompanyOwnersCompanyDetails(payload)),
  getAllRegisteredCompanyClients: () =>
    dispatch(getAllRegisteredCompanyClients())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
