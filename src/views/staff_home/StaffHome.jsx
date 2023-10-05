import React, {Component} from "react";
import {Columns, Container} from "react-bulma-components";
import IdleTimer from "react-idle-timer";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {DEBOUNCE, IDLE_TIMEOUT} from "../../config/constants/Constants";
import {terminateCurrentSession} from "../../store/modules/current_session/actions";
import TopBar from "../../components/topbar/TopBar";
import {
    CHANGE_STUDENT_RESIDENCE,
    CORRECT_STUDENT_PERSONAL_DETAILS, ENTIRE_SCHOOL_ANNOUNCEMENT,
    PAY_FEE, PAYMENTS_MADE_ON_SPECIFIC_DATE, PAYMENTS_MADE_TODAY, PAYMENTS_MADE_WITHIN_A_DATE_RANGE,
    REGISTER_A_STUDENT_PAGE,
    SEND_HOME_FROM_ENTIRE_SCHOOL,
    SEND_HOME_PER_CLASS, SEND_HOME_PER_LOT, SPECIFIC_CLASS_ANNOUNCEMENT, SPECIFIC_STREAM_ANNOUNCEMENT
} from "./StaffHomeConstants";
import StudentsPage from "./student_management/students/StudentsPage";
import StaffSideBar from "../../components/sidebar/StaffSideBar";
import Modal from "react-awesome-modal";
import StudentRegistrationForm from "./student_management/students/StudentRegistrationForm";
import {BURSAR_ROLE} from "../../config/constants/RolesConfig";
import {
    CHANGE_A_STUDENT_RESIDENCE_ACCESS_PRIVILEGE,
    CORRECT_A_STUDENT_PERSONAL_DETAILS_ACCESS_PRIVILEGE,
    REGISTER_A_FEE_INSTALLMENT_ACCESS_PRIVILEGE,
    REGISTER_A_STUDENT_ACCESS_PRIVILEGE
} from "../../config/constants/AccessPrivilegesConfig";
import {PERMISSION_GRANTED} from "../../config/constants/PermisionStatus";
import ErrorPage from "../../components/error_page/ErrorPage";
import FeePaymentForm from "./fee_management/FeePaymentForm";
import FeePaymentConfirmationModal from "./fee_management/FeePaymentConfirmationModal";
import FeeStatementView from "./fee_management/fee_statement/FeeStatementView";

import "./StaffHome.scss";
import TitlePanel from "../../components/title_panel/TitlePanel";
import FeeBalancePage from "./fee_management/fee_balance/FeeBalancePage";
import SchoolFeeQueryForm from "./fee_management/fee_balance/overral_school/SchoolFeeQueryForm";
import PerClassFeeQueryForm from "./fee_management/fee_balance/per_class/PerClassFeeQueryForm";
import PersonalDetailsCorrectionForm
    from "./student_management/personal_details_correction/PersonalDetailsCorrectionForm";
import SuccessFailureModal from "../../components/modals/success_failure_modal/SuccessFailureModal";
import ChangeResidencePage from "./residence_management/ChangeResidencePage";
import PerLotFeeQueryForm from "./fee_management/fee_balance/overral_school/per_lot/PerLotFeeQueryForm";
import GeneralAnnouncementsForm from "./announcements/GeneralAnnouncementsForm";
import {
    ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE,
    SPECIFIC_CLASS_ANNOUNCEMENT_TYPE, SPECIFIC_STREAM_ANNOUNCEMENT_TYPE
} from "./announcements/AnnouncementTypesConstants";
import {downloadExcelFileFromBackend} from "../../services/transactions_service_connector/TransactionsServiceConnector";
import {formatString, today} from "../../config/common/Utils";
import {transactionsIp} from "../../config/EndPoint";
import ExcelInstallmentDateSelectionForm from "./downloads/installments/ExcelInstallmentDateSelectionForm";

class StaffHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successFailureModalBoolean: false,
            pagePanelTitle: "School student's list",
            displayFeeStatementModal: false,
            feePayload: "",
            displayStudents: true,
            displayStaffHomeModal: false,
            displayStudentRegistrationForm: false,
            displayPayFeeForm: false,
            displayFeePaymentConfirmationModal: false,
            displayStudentsPage: true,
            displayFeeBalancePage: false,
            displayFeeBalanceModal: false,
            displaySchoolFeeQueryForm: false,
            displayPerClassFeeQueryForm: false,
            displayPerLotFeeQueryForm: false,
            displayStudentPersonalDetailsCorrectionForm: false,
            displaySuccessFailureModal: false,
            displayChangeResidenceModal: false,
            displayEntireSchoolAnnouncementForm: false,
            displayClassAnnouncementForm: false,
            displayStreamAnnouncementForm: false,
            displayInstallmentsDownloadDateSelectionForm: false,
            installmentDownloadQueryScenario: ""
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
        const {sessionDetails} = this.props;

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
                displayFeePaymentConfirmationModal: false,
                displayStudentPersonalDetailsCorrectionForm: false,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: false
            });
        } else if (formToDisplay === PAY_FEE) {
            this.setState({
                displayStaffHomeModal: true,
                displayPayFeeForm: true,
                displayStudentRegistrationForm: false,
                displayFeePaymentConfirmationModal: false,
                displayStudentPersonalDetailsCorrectionForm: false,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: false
            });
        } else if (formToDisplay === SEND_HOME_FROM_ENTIRE_SCHOOL) {
            this.setState({
                displayStaffHomeModal: false,
                displayPayFeeForm: false,
                displayStudentRegistrationForm: false,
                displayFeePaymentConfirmationModal: false,
                displayStudentsPage: false,
                displayFeeBalanceModal: true,
                displayFeeBalancePage: true,
                displaySchoolFeeQueryForm: true,
                displayPerClassFeeQueryForm: false,
                displayPerLotFeeQueryForm: false,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: false
            });
        } else if (formToDisplay === SEND_HOME_PER_CLASS) {
            this.setState({
                displayStaffHomeModal: false,
                displayPayFeeForm: false,
                displayStudentRegistrationForm: false,
                displayFeePaymentConfirmationModal: false,
                displayStudentsPage: false,
                displayFeeBalanceModal: true,
                displayFeeBalancePage: true,
                displaySchoolFeeQueryForm: false,
                displayPerClassFeeQueryForm: true,
                displayPerLotFeeQueryForm: false,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: false
            });
        } else if (formToDisplay === SEND_HOME_PER_LOT) {
            this.setState({
                displayStaffHomeModal: false,
                displayPayFeeForm: false,
                displayStudentRegistrationForm: false,
                displayFeePaymentConfirmationModal: false,
                displayStudentsPage: false,
                displayFeeBalanceModal: true,
                displayFeeBalancePage: true,
                displaySchoolFeeQueryForm: false,
                displayPerClassFeeQueryForm: false,
                displayPerLotFeeQueryForm: true,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: false
            });
        } else if (formToDisplay === CORRECT_STUDENT_PERSONAL_DETAILS) {
            this.setState({
                displayStaffHomeModal: true,
                displayPayFeeForm: false,
                displayStudentRegistrationForm: false,
                displayFeePaymentConfirmationModal: false,
                displayStudentPersonalDetailsCorrectionForm: true,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: false
            });
        } else if (formToDisplay === CHANGE_STUDENT_RESIDENCE) {
            this.setState({
                displayStaffHomeModal: true,
                displayPayFeeForm: false,
                displayStudentRegistrationForm: false,
                displayFeePaymentConfirmationModal: false,
                displayStudentPersonalDetailsCorrectionForm: false,
                displaySuccessFailureModal: false,
                displayChangeResidenceModal: true
            });
        } else if (formToDisplay === ENTIRE_SCHOOL_ANNOUNCEMENT) {
            this.setState({
                displayEntireSchoolAnnouncementForm: true,
                announcementType: ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE
            });
        } else if (formToDisplay === SPECIFIC_CLASS_ANNOUNCEMENT) {
            this.setState({
                displayClassAnnouncementForm: true,
                announcementType: SPECIFIC_CLASS_ANNOUNCEMENT_TYPE
            });
        } else if (formToDisplay === SPECIFIC_STREAM_ANNOUNCEMENT) {
            this.setState({
                displayStreamAnnouncementForm: true,
                announcementType: SPECIFIC_STREAM_ANNOUNCEMENT_TYPE
            });
        } else if (formToDisplay === PAYMENTS_MADE_TODAY) {
            const url = formatString("{0}/installments/excel/fee-installments-made-today", transactionsIp);
            downloadExcelFileFromBackend(url, formatString("Today {0}'s fee payments", today()))
        } else if (formToDisplay === PAYMENTS_MADE_ON_SPECIFIC_DATE) {
            this.setState({
                displayInstallmentsDownloadDateSelectionForm: true
                , installmentDownloadQueryScenario: PAYMENTS_MADE_ON_SPECIFIC_DATE
            });
        } else if (formToDisplay === PAYMENTS_MADE_WITHIN_A_DATE_RANGE) {
            this.setState({
                displayInstallmentsDownloadDateSelectionForm: true
                , installmentDownloadQueryScenario: PAYMENTS_MADE_WITHIN_A_DATE_RANGE
            });
        }
    };

    onIdle = e => {
        const {sessionDetails} = this.props;

        const payload = {
            ColumnName: "SessionLogId",
            ColumnValue: sessionDetails.sessionLogsEntity.sessionLogId
        };
        this.props.terminateCurrentSession(payload);
        this.props.history.push("/");
    };

    isAccessGranted = accessPrivilege => {
        const {sessionDetails} = this.props;

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
        this.setState({displayStaffHomeModal: false});
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
            feePayload: "",
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
        this.setState({displayFeeStatementModal: false});
    };

    toggleFeeBalanceModal = isModalOpen => {
        this.setState({displayFeeBalanceModal: isModalOpen});
    };

    closeSchoolFeeQueryModal = minimumFeeBalance => {
        this.setState({
            displayFeeBalanceModal: false,
            pagePanelTitle:
                "School-wide fee balances of KES " + minimumFeeBalance + " and above"
        });
    };

    closePerClassFeeQueryModal = (className, minimumFeeBalance) => {
        this.setState({
            displayFeeBalanceModal: false,
            pagePanelTitle:
                className + " fee balances of KES " + minimumFeeBalance + " and above"
        });
    };

    handleClosePerLotFeeQueryModal = (lotName, minimumFeeBalance) => {
        this.setState({
            displayFeeBalanceModal: false,
            pagePanelTitle:
                lotName + " fee balances of KES " + minimumFeeBalance + " and above"
        });
    };

    handleClosePersonalDetailsCorrectionModal = isUpdateSuccessful => {
        this.setState({
            displayStaffHomeModal: false,
            displayPayFeeForm: false,
            displayStudentRegistrationForm: false,
            displayFeePaymentConfirmationModal: false,
            displayStudentPersonalDetailsCorrectionForm: false,
            displaySuccessFailureModal: true,
            successFailureModalBoolean: isUpdateSuccessful
        });
    };

    handleSuccessFailureModalExteriorClicked = () => {
        this.setState({
            displayStaffHomeModal: false,
            displayPayFeeForm: false,
            displayStudentRegistrationForm: false,
            displayFeePaymentConfirmationModal: false,
            displayStudentPersonalDetailsCorrectionForm: false,
            displaySuccessFailureModal: false,
            successFailureModalBoolean: false
        });
    };

    handleGeneralAnnouncementExteriorClicked = () => {
        this.setState({
            displayEntireSchoolAnnouncementForm: false
            , displayClassAnnouncementForm: false
            , displayStreamAnnouncementForm: false
        });
    };

    handleInstallmentExcelDownloadFormModalExteriorClicked = () => {
        this.setState({displayInstallmentsDownloadDateSelectionForm: false});
    };

    render() {
        const {sessionDetails} = this.props;
        const {
            displayStudentsPage,
            displayFeeBalancePage,
            pagePanelTitle,
            displaySchoolFeeQueryForm,
            displayPerClassFeeQueryForm,
            successFailureModalBoolean,
            displayPerLotFeeQueryForm,
            displayEntireSchoolAnnouncementForm,
            displayClassAnnouncementForm,
            displayStreamAnnouncementForm,
            displayInstallmentsDownloadDateSelectionForm,
            installmentDownloadQueryScenario
        } = this.state;

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
                <TopBar/>
                <Columns className="is-gapless">
                    <Columns.Column size="one-fifth">
                        <StaffSideBar handleSideBarClicked={this.handleSideBarClicked}/>
                    </Columns.Column>

                    <Columns.Column>
                        <div className="staff__title-panel-div">
                            <TitlePanel
                                title={pagePanelTitle}
                                userName={
                                    sessionDetails && sessionDetails.name
                                        ? sessionDetails.name
                                        : "Username"
                                }
                                userEmail={
                                    sessionDetails && sessionDetails.email
                                        ? sessionDetails.email
                                        : "Email"
                                }
                                userNameInitials={
                                    sessionDetails && sessionDetails.name
                                        ? sessionDetails.name.charAt(0)
                                        : "I"
                                }
                            />
                        </div>
                        <Container className="staff__main-body">
                            {displayStudentsPage && (
                                <StudentsPage
                                    launchFeeStatementModal={this.launchFeeStatementModal}
                                />
                            )}
                            {displayFeeBalancePage && (
                                <FeeBalancePage
                                    launchFeeStatementModal={this.launchFeeStatementModal}
                                />
                            )}
                        </Container>
                    </Columns.Column>
                </Columns>
                <Modal
                    visible={this.state.displayStaffHomeModal}
                    width="500"
                    height="510"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleStaffHomeModalExteriorClicked();
                    }}
                >
                    {this.state.displayStudentRegistrationForm && (
                        <div>
                            {this.isAccessGranted(REGISTER_A_STUDENT_ACCESS_PRIVILEGE) ? (
                                <StudentRegistrationForm/>
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
                            {this.isAccessGranted(
                                REGISTER_A_FEE_INSTALLMENT_ACCESS_PRIVILEGE
                            ) ? (
                                <FeePaymentForm
                                    launchFeePaymentConfirmationModal={
                                        this.launchFeePaymentConfirmationModal
                                    }
                                />
                            ) : (
                                <ErrorPage
                                    errorTitle="Permision to pay fee not granted"
                                    errorCode="Error Code: ACCESS_DENIED"
                                    errorResolution="Kindly contact the admin for this access"
                                />
                            )}
                        </div>
                    )}

                    {this.state.displayFeePaymentConfirmationModal && (
                        <FeePaymentConfirmationModal
                            history={this.props.history}
                            feePayload={this.state.feePayload}
                            closeFeeConfirmationModal={this.closeFeePaymentConfirmationModal}
                            launchFeeStatementModal={this.launchFeeStatementModal}
                        />
                    )}

                    {this.state.displayStudentPersonalDetailsCorrectionForm && (
                        <div>
                            {this.isAccessGranted(
                                CORRECT_A_STUDENT_PERSONAL_DETAILS_ACCESS_PRIVILEGE
                            ) ? (
                                <PersonalDetailsCorrectionForm
                                    closePersonalDetailsCorrectionModal={
                                        this.handleClosePersonalDetailsCorrectionModal
                                    }
                                />
                            ) : (
                                <ErrorPage
                                    errorTitle="Permision to edit details not granted"
                                    errorCode="Error Code: ACCESS_DENIED"
                                    errorResolution="Kindly contact the admin for this access"
                                />
                            )}
                        </div>
                    )}

                    {this.state.displayChangeResidenceModal && (
                        <div>
                            {this.isAccessGranted(
                                CHANGE_A_STUDENT_RESIDENCE_ACCESS_PRIVILEGE
                            ) ? (
                                <ChangeResidencePage
                                    sessionLogId={sessionDetails.sessionLogsEntity.sessionLogId}
                                    closeModal={this.handleStaffHomeModalExteriorClicked}
                                />
                            ) : (
                                <ErrorPage
                                    errorTitle="Permision to change residence not granted"
                                    errorCode="Error Code: ACCESS_DENIED"
                                    errorResolution="Kindly contact the admin for this access"
                                />
                            )}
                        </div>
                    )}
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
                    <FeeStatementView
                        closeFeeConfirmationModal={this.closeFeePaymentConfirmationModal}
                        closeFeeStatementModal={this.handleFeeStatementModalExteriorClicked}
                    />
                </Modal>

                <Modal
                    visible={this.state.displayFeeBalanceModal}
                    width="500"
                    height="320"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.toggleFeeBalanceModal(false);
                    }}
                >
                    {displaySchoolFeeQueryForm && (
                        <SchoolFeeQueryForm
                            closeSchoolFeeQueryModal={this.closeSchoolFeeQueryModal}
                        />
                    )}
                    {displayPerClassFeeQueryForm && (
                        <PerClassFeeQueryForm
                            closePerClassFeeQueryModal={this.closePerClassFeeQueryModal}
                        />
                    )}
                    {displayPerLotFeeQueryForm && (
                        <PerLotFeeQueryForm closePerLotFeeQueryModal={this.handleClosePerLotFeeQueryModal}/>
                    )}
                </Modal>

                {this.state.displaySuccessFailureModal && (
                    <SuccessFailureModal
                        handleModalExteriorClicked={
                            this.handleSuccessFailureModalExteriorClicked
                        }
                        isASuccess={successFailureModalBoolean}
                    />
                )}

                <Modal
                    visible={displayEntireSchoolAnnouncementForm
                        || displayClassAnnouncementForm
                        || displayStreamAnnouncementForm}
                    width="900"
                    height="450"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleGeneralAnnouncementExteriorClicked();
                    }}
                >
                    {displayEntireSchoolAnnouncementForm && (
                        <GeneralAnnouncementsForm announcementType={ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE}
                                                  isSelectOptionsWidgetRequired={false}
                                                  handleSuccessFailureModalFinalStageExteriorClicked={this.handleGeneralAnnouncementExteriorClicked}/>)}
                    {displayClassAnnouncementForm && (
                        <GeneralAnnouncementsForm announcementType={SPECIFIC_CLASS_ANNOUNCEMENT_TYPE}
                                                  isSelectOptionsWidgetRequired={true}
                                                  handleSuccessFailureModalFinalStageExteriorClicked={this.handleGeneralAnnouncementExteriorClicked}/>)}
                    {displayStreamAnnouncementForm && (
                        <GeneralAnnouncementsForm announcementType={SPECIFIC_STREAM_ANNOUNCEMENT_TYPE}
                                                  isSelectOptionsWidgetRequired={true}
                                                  handleSuccessFailureModalFinalStageExteriorClicked={this.handleGeneralAnnouncementExteriorClicked}/>)}
                </Modal>

                <Modal
                    visible={displayInstallmentsDownloadDateSelectionForm}
                    width="450"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleInstallmentExcelDownloadFormModalExteriorClicked();
                    }}
                >
                    {installmentDownloadQueryScenario === PAYMENTS_MADE_ON_SPECIFIC_DATE
                        && (<ExcelInstallmentDateSelectionForm
                            installmentExcelDownloadQueryScenario={PAYMENTS_MADE_ON_SPECIFIC_DATE}
                            handleFinalSubmitButtonClicked={this.handleInstallmentExcelDownloadFormModalExteriorClicked}/>)}
                    {installmentDownloadQueryScenario === PAYMENTS_MADE_WITHIN_A_DATE_RANGE
                        && (<ExcelInstallmentDateSelectionForm
                            installmentExcelDownloadQueryScenario={PAYMENTS_MADE_WITHIN_A_DATE_RANGE}
                            handleFinalSubmitButtonClicked={this.handleInstallmentExcelDownloadFormModalExteriorClicked}/>)}
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
