import React, { Component } from "react";
import { Columns, Container } from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CompanyOwnerHome.scss";
import { DEBOUNCE, IDLE_TIMEOUT } from "../../config/constants/Constants";
import { terminateCurrentSession } from "../../store/modules/current_session/actions";
import TopBar from "../../components/topbar/TopBar";
import CompanyOwnerSideBar from "../../components/sidebar/CompanyOwnerSideBar";
import RegisterCompanyBranches from "./register_company_branches/RegisterCompanyBranches";
import {
  REGISTER_COMPANY_BRANCHES_FORM,
  REGISTER_EMPLOYMENT_CATEGORIES_FORM,
  REGISTER_SYSTEM_USERS_FORM
} from "./CompanyOwnerHomeConstants";
import {
  getACompanysBranches,
  getACompanysEmploymentCategories,
  getACompanysSystemUsers,
  getCompanyOwnersCompanyDetails
} from "../../store/modules/company_owner_home/actions";
import RegisterSystemUsers from "./register_system_users/RegisterSystemUsers";
import RegisterEmploymentCategories from "./register_employment_categories/RegisterEmploymentCategories";

class CompanyOwnerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayRegisterCompanyBranchesForm: true,
      displayRegisterSystemUsersForm: false,
      displayRegisterEmploymentCategories: false
    };
    this.idleTimer = null;
  }

  componentDidMount() {
    if (!this.props.isSessionActive) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    if (!this.props.isSessionActive) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    this.props.terminateCurrentSession();
  }

  handleSideBarClicked = formToDisplay => {
    if (formToDisplay === REGISTER_COMPANY_BRANCHES_FORM) {
      const paload = {
        companyOwnerId: this.props.companyOwnerId
      };
      this.props.getCompanyOwnersCompanyDetails(paload);
      this.setState({
        displayRegisterCompanyBranchesForm: true,
        displayRegisterSystemUsersForm: false,
        displayRegisterEmploymentCategories: false
      });
    } else if (formToDisplay === REGISTER_SYSTEM_USERS_FORM) {
      const paload = {
        column_name: "CompanyId",
        search_value: this.props.CompanyId
      };
      this.props.getACompanysBranches(paload);
      const payload = {
        companyId: this.props.CompanyId
      };
      this.props.getACompanysSystemUsers(payload);
      this.setState({
        displayRegisterCompanyBranchesForm: false,
        displayRegisterSystemUsersForm: true,
        displayRegisterEmploymentCategories: false
      });
    } else if (formToDisplay === REGISTER_EMPLOYMENT_CATEGORIES_FORM) {
      const paload = {
        column_name: "CompanyId",
        search_value: this.props.CompanyId
      };
      this.props.getACompanysBranches(paload);

      const payload = {
        column_name: "CompanyId",
        search_value: this.props.CompanyId
      };
      this.props.getACompanysEmploymentCategories(payload);

      this.setState({
        displayRegisterCompanyBranchesForm: false,
        displayRegisterSystemUsersForm: false,
        displayRegisterEmploymentCategories: true
      });
    }
  };

  onIdle = e => {
    this.props.terminateCurrentSession();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="main-body">
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onIdle={this.onIdle}
          debounce={DEBOUNCE}
          timeout={IDLE_TIMEOUT}
        />
        <TopBar />
        <Columns>
          <Columns.Column size="one-fifth">
            <CompanyOwnerSideBar
              handleSideBarClicked={this.handleSideBarClicked}
            />
          </Columns.Column>

          <Container>
            <div
              className={
                this.state.displayRegisterCompanyBranchesForm ? "show" : "hide"
              }
            >
              <RegisterCompanyBranches />
            </div>

            <div
              className={
                this.state.displayRegisterSystemUsersForm ? "show" : "hide"
              }
            >
              <RegisterSystemUsers />
            </div>

            <div
              className={
                this.state.displayRegisterEmploymentCategories ? "show" : "hide"
              }
            >
              <RegisterEmploymentCategories />
            </div>
          </Container>
        </Columns>
      </div>
    );
  }
}

CompanyOwnerHome.propTypes = {
  isSessionActive: PropTypes.bool.isRequired,
  terminateCurrentSession: PropTypes.func.isRequired,
  getCompanyOwnersCompanyDetails: PropTypes.func.isRequired,
  companyOwnerId: PropTypes.string.isRequired,
  getACompanysSystemUsers: PropTypes.func.isRequired,
  getACompanysBranches: PropTypes.func.isRequired,
  getACompanysEmploymentCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  companyOwnerId: state.current_session.session_details.CompanyOwnerId,
  CompanyId: state.company_owner_home.companyOwnersCompanyDetails.CompanyId,
  isSessionActive: state.current_session.isSessionActive
});

const mapDispatchToProps = dispatch => ({
  terminateCurrentSession: () => dispatch(terminateCurrentSession()),
  getACompanysBranches: payload => dispatch(getACompanysBranches(payload)),
  getCompanyOwnersCompanyDetails: payload =>
    dispatch(getCompanyOwnersCompanyDetails(payload)),
  getACompanysSystemUsers: payload =>
    dispatch(getACompanysSystemUsers(payload)),
  getACompanysEmploymentCategories: payload =>
    dispatch(getACompanysEmploymentCategories(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyOwnerHome);
