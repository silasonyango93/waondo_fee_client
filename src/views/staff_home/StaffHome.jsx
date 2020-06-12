import React, { Component } from "react";
import { Columns, Container } from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { DEBOUNCE, IDLE_TIMEOUT } from "../../config/constants/Constants";
import { terminateCurrentSession } from "../../store/modules/current_session/actions";
import TopBar from "../../components/topbar/TopBar";
import {PAY_FEE, REGISTER_A_STUDENT_PAGE} from "./StaffHomeConstants";
import StudentsPage from "./student_management/students/StudentsPage";
import StaffSideBar from "../../components/sidebar/StaffSideBar";
import Modal from "react-awesome-modal";
import StudentRegistrationForm from "./student_management/students/StudentRegistrationForm";
import { BURSAR_ROLE } from "../../config/constants/RolesConfig";
import {
  REGISTER_A_FEE_INSTALLMENT_ACCESS_PRIVILEGE,
  REGISTER_A_STUDENT_ACCESS_PRIVILEGE
} from "../../config/constants/AccessPrivilegesConfig";
import { PERMISSION_GRANTED } from "../../config/constants/PermisionStatus";
import ErrorPage from "../../components/error_page/ErrorPage";
import FeePaymentForm from "./fee_management/FeePaymentForm";
import FeePaymentConfirmationModal from "./fee_management/FeePaymentConfirmationModal";
import FeeStatementView from "./fee_management/fee_statement/FeeStatementView";

class StaffHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFeeStatementModal: false,
      feePayload: '',
      displayStudents: true,
      displayStaffHomeModal: false,
      displayStudentRegistrationForm: false,
      displayPayFeeForm: false,
      displayFeePaymentConfirmationModal: false
    };
    this.idleTimer = null;
  }

  componentDidMount() {
    if (!this.props.isSessionActive) {
      window.location.assign("/");
    } else {
      window.addEventListener("beforeunload", this.handleTabClosed);
    }
  }

  componentDidUpdate() {
    if (!this.props.isSessionActive) {
      this.props.history.push("/");
    }
  }

  handleTabClosed = e => {
    e.preventDefault();
    const { sessionDetails } = this.props;

    const payload = {
      ColumnName: "SessionLogId",
      ColumnValue: sessionDetails.sessionLogsEntity.sessionLogId
    };
    this.props.terminateCurrentSession(payload);
  };

  handleSideBarClicked = formToDisplay => {
    if (formToDisplay === REGISTER_A_STUDENT_PAGE) {
      this.setState({
        displayStaffHomeModal: true,
        displayStudentRegistrationForm: true,
        displayPayFeeForm: false,
        displayFeePaymentConfirmationModal: false
      });
    } else if(formToDisplay === PAY_FEE) {
      this.setState({
        displayStaffHomeModal: true,
        displayPayFeeForm: true,
        displayStudentRegistrationForm: false,
        displayFeePaymentConfirmationModal: false
      });
    }
  };

  onIdle = e => {
    const { sessionDetails } = this.props;

    const payload = {
      ColumnName: "SessionLogId",
      ColumnValue: sessionDetails.sessionLogsEntity.sessionLogId
    };
    this.props.terminateCurrentSession(payload);
    this.props.history.push("/");
  };

  isAccessGranted = accessPrivilege => {
    const { sessionDetails } = this.props;

    let userAccessPrivilege = [];

    if (
      sessionDetails &&
      sessionDetails.userRolesDtoList &&
      sessionDetails.userRolesDtoList.length
    ) {
      const userRole = sessionDetails.userRolesDtoList.filter(
        roleItem => roleItem.roleCode === BURSAR_ROLE
      );
      userAccessPrivilege = userRole[0].userAccessPrivilegesDtoList.filter(
        privilegeItem =>
          privilegeItem.accessPrivilegeCode === accessPrivilege &&
          privilegeItem.permisionStatus === PERMISSION_GRANTED
      );

    }

    return userAccessPrivilege.length > 0;
  };

  handleStaffHomeModalExteriorClicked = () => {
    this.setState({ displayStaffHomeModal: false });
  };

  launchFeePaymentConfirmationModal = payload => {
    this.setState({
      feePayload: payload,
      displayStaffHomeModal: true,
      displayPayFeeForm: false,
      displayStudentRegistrationForm: false,
      displayFeePaymentConfirmationModal: true
    });
  };

  closeFeePaymentConfirmationModal = () => {
    this.setState({
      feePayload: '',
      displayStaffHomeModal: false,
      displayPayFeeForm: false,
      displayStudentRegistrationForm: false,
      displayFeePaymentConfirmationModal: false
    });
  };

  launchFeeStatementModal = () => {
      this.setState({displayFeeStatementModal: true});
  };

  handleFeeStatementModalExteriorClicked = () => {
    this.setState({ displayFeeStatementModal: false });
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
            <StaffSideBar handleSideBarClicked={this.handleSideBarClicked} />
          </Columns.Column>

          <Container>
            {<StudentsPage /> && this.state.displayStudents}
          </Container>
        </Columns>
        <Modal
          visible={this.state.displayStaffHomeModal}
          width="500"
          height="450"
          effect="fadeInUp"
          onClickAway={() => {
            this.handleStaffHomeModalExteriorClicked();
          }}
        >
          {this.state.displayStudentRegistrationForm && (
            <div>
              {this.isAccessGranted(REGISTER_A_STUDENT_ACCESS_PRIVILEGE) ? (
                <StudentRegistrationForm />
              ) : (
                <ErrorPage
                  errorTitle="Permision to register a student not granted"
                  errorCode="Error Code: ACCESS_DENIED"
                  errorResolution="Kindly contact the admin for this access"
                />
              )}
            </div>
          )}

          {this.state.displayPayFeeForm && (
              <div>
                {this.isAccessGranted(REGISTER_A_FEE_INSTALLMENT_ACCESS_PRIVILEGE) ? (
                    <FeePaymentForm launchFeePaymentConfirmationModal={this.launchFeePaymentConfirmationModal}/>
                ) : (
                    <ErrorPage
                        errorTitle="Permision to pay fee not granted"
                        errorCode="Error Code: ACCESS_DENIED"
                        errorResolution="Kindly contact the admin for this access"
                    />
                )}
              </div>
          )}

          {this.state.displayFeePaymentConfirmationModal && (<FeePaymentConfirmationModal feePayload={this.state.feePayload} closeFeeConfirmationModal={this.closeFeePaymentConfirmationModal} launchFeeStatementModal={this.launchFeeStatementModal}/>)}

        </Modal>

        <Modal
            visible={this.state.displayFeeStatementModal}
            width="900"
            height="600"
            effect="fadeInUp"
            onClickAway={() => {
              this.handleFeeStatementModalExteriorClicked();
            }}
        >

          <FeeStatementView />

        </Modal>
      </div>
    );
  }
}

StaffHome.propTypes = {
  isSessionActive: PropTypes.bool.isRequired,
  terminateCurrentSession: PropTypes.func.isRequired,
  sessionDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isSessionActive: state.current_session.isSessionActive,
  sessionDetails: state.current_session.sessionDetails
});

const mapDispatchToProps = dispatch => ({
  terminateCurrentSession: payload => dispatch(terminateCurrentSession(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffHome);
