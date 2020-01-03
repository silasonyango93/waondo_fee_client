import React, { Component } from "react";
import { Columns, Container } from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import RegisterCompanies from "./register_companies/RegisterCompanies";
import "./AdminHome.scss";
import {
  COMPANIES_OWNERS_RSHIP_FORM,
  REGISTER_COMPANIES_FORM,
  REGISTER_COMPANIES_OWNERS_FORM
} from "./AdminHomeConstants";
import RegisterCompanyOwners from "./register_company_owners/RegisterCompanyOwners";
import { DEBOUNCE, IDLE_TIMEOUT } from "../../config/constants/Constants";
import { terminateCurrentSession } from "../../store/modules/current_session/actions";
import CompanyOwnersRship from "./company_owners_rship/CompanyOwnersRship";
import TopBar from "../../components/topbar/TopBar";
import {
  getAllCompanies,
  getAllCompanyOwners
} from "../../store/modules/admin_home/actions";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayRegisterCompaniesForm: true,
      displayRegisterCompanyOwnersForm: false,
      displayCompaniesOwnersRshipForm: false
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
    if (formToDisplay === REGISTER_COMPANIES_FORM) {
      this.setState({
        displayRegisterCompaniesForm: true,
        displayCompaniesOwnersRshipForm: false,
        displayRegisterCompanyOwnersForm: false
      });
    } else if (formToDisplay === REGISTER_COMPANIES_OWNERS_FORM) {
      this.props.getAllCompanies();
      this.props.getAllCompanyOwners();
      this.setState({
        displayRegisterCompaniesForm: false,
        displayCompaniesOwnersRshipForm: false,
        displayRegisterCompanyOwnersForm: true
      });
    } else if (formToDisplay === COMPANIES_OWNERS_RSHIP_FORM) {
      this.props.getAllCompanies();
      this.props.getAllCompanyOwners();
      this.setState({
        displayRegisterCompaniesForm: false,
        displayRegisterCompanyOwnersForm: false,
        displayCompaniesOwnersRshipForm: true
      });
    }
  };

  onIdle = e => {
    this.props.terminateCurrentSession();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
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
            <AdminSideBar handleSideBarClicked={this.handleSideBarClicked} />
          </Columns.Column>

          <Container>
            <div
              className={
                this.state.displayRegisterCompaniesForm ? "show" : "hide"
              }
            >
              <RegisterCompanies />
            </div>
            <div
              className={
                this.state.displayRegisterCompanyOwnersForm ? "show" : "hide"
              }
            >
              <RegisterCompanyOwners />
            </div>
            <div
              className={
                this.state.displayCompaniesOwnersRshipForm ? "show" : "hide"
              }
            >
              <CompanyOwnersRship />
            </div>
          </Container>
        </Columns>
      </div>
    );
  }
}

AdminHome.propTypes = {
  isSessionActive: PropTypes.bool.isRequired,
  getAllCompanies: PropTypes.func.isRequired,
  getAllCompanyOwners: PropTypes.func.isRequired,
  terminateCurrentSession: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSessionActive: state.current_session.isSessionActive
});

const mapDispatchToProps = dispatch => ({
  terminateCurrentSession: () => dispatch(terminateCurrentSession()),
  getAllCompanies: () => dispatch(getAllCompanies()),
  getAllCompanyOwners: () => dispatch(getAllCompanyOwners())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHome);
