import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllStudents,
    fetchAStudentFeeStatement
} from "../../../../store/modules/staff_home/actions";
import FeeStatementView from "../../fee_management/fee_statement/FeeStatementView";
import Modal from "react-awesome-modal";
import EmptySearchResponse from "../../../../components/empty_search_response/EmptySearchResponse";
import "./FeeBalancePage.scss";
import FeeReminderDeadlineDateForm from "../fee_payment_reminder/FeeReminderDeadlineDateForm";
import ActionConfirmationView from "../../../../components/action_confirmation/ActionConfirmationView";
import {currencyDisplay, formatString} from "../../../../config/common/Utils";
import {
    promiselessTransactionsServiceGetAll, simpleTransactionsServiceGet
} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";
import SuccessFailureModal from "../../../../components/modals/success_failure_modal/SuccessFailureModal";

class FeeBalancePage extends Component {
    state = {
        tableData: [],
        displayFeeStatementModal: false,
        displayDeadlineDateForm: false,
        displayFeeReminderConfirmationModal: false,
        selectedFeePaymentDeadlineDate: "",
        formattedFeeReminderConfirmationPrompt: "",
        feeReminderSmsSentSuccessfully: false,
        displaySuccessForFeeReminderSmsBroadcast: false
    };

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.feeBalanceList !== prevProps.feeBalanceList) {
            if (this.props.feeBalanceList && this.props.feeBalanceList.length) {
                let feeBalanceList = this.props.feeBalanceList.map((item, index) => {
                    return {
                        id: index + 1,
                        admissionNumber: item.admissionNumber,
                        studentName: item.studentName,
                        gender: item.gender,
                        classDetails: item.classDetails,
                        residenceDetails: item.residenceDetails,
                        total: item.total,
                        termBalance: item.termBalance,
                        annualBalance: item.annualBalance
                    };
                });

                this.setState({tableData: feeBalanceList});
            }
        }
        if (this.props.sendStudentsHomePerActualClassQueryPayload
            !== prevProps.sendStudentsHomePerActualClassQueryPayload) {
            const {sendStudentsHomePerActualClassQueryPayload} = this.props;
            if (sendStudentsHomePerActualClassQueryPayload && sendStudentsHomePerActualClassQueryPayload.classId) {
                const classDetails = await simpleTransactionsServiceGet(
                    "/academic-classes/class-details/fetch-class-by-its-full-name?classId="
                    + sendStudentsHomePerActualClassQueryPayload.classId);
                const formattedString = formatString("You are about to send a broadcast message reminder to parents of {0} with fee balances equal " +
                    "to or greater than {1} to pay fees by date {2}", classDetails.data.AcademicClassLevelName + classDetails.data.ClassStreamName
                    , currencyDisplay(sendStudentsHomePerActualClassQueryPayload.minimumFeeBalance), this.state.selectedFeePaymentDeadlineDate);
                this.setState({formattedFeeReminderConfirmationPrompt: formattedString})
            }
        }
    }

    handleTableRowIsClicked = async rowObject => {
        const payload = {
            admissionNumber: rowObject.admissionNumber
        };

        await this.props.fetchAStudentFeeStatement(payload);
        this.props.launchFeeStatementModal();
    };

    handleFeeStatementModalExteriorClicked = () => {
        this.setState({displayFeeStatementModal: false});
    };

    handleSmsReminderIconClicked = () => {
        this.setState({displayDeadlineDateForm: true});
    };

    handleSmsReminderFormModalExteriorClicked = () => {
        this.setState({displayDeadlineDateForm: false});
    };

    handleReminderDeadlineDateFormSubmitButtonIsClicked = async (deadlineDate) => {
        this.setState({
            displayDeadlineDateForm: false,
            selectedFeePaymentDeadlineDate: deadlineDate,
            displayFeeReminderConfirmationModal: true
        });
    };

    handleSendFeeReminderConfirmButtonClicked = async () => {
        const {sendStudentsHomePerActualClassQueryPayload} = this.props;
        const {selectedFeePaymentDeadlineDate} = this.state;
        //Reusing the sendStudentsHomePerActualClassQueryPayload even for lot fee balance queries.
        // Differentiated by the boolean field isALotFeeBeingQueried
        if (sendStudentsHomePerActualClassQueryPayload.feeBalanceQueryScenario === "PER_LOT_FEE_QUERY") {
            const lotId = sendStudentsHomePerActualClassQueryPayload.lotId;
            const feeBalanceThreshold = sendStudentsHomePerActualClassQueryPayload.minimumFeeBalance;
            try {
                await simpleTransactionsServiceGet(
                    formatString("/statements/sms/send-fee-reminder-to-specific-lot-with-threshold" +
                        "?lotId={0}&feeBalanceThreshold={1}&paymentDeadlineDate={2}"
                        , lotId, feeBalanceThreshold, selectedFeePaymentDeadlineDate));
                this.setState({
                    feeReminderSmsSentSuccessfully: true,
                    displayFeeReminderConfirmationModal: false,
                    displaySuccessForFeeReminderSmsBroadcast: true
                });
            } catch (e) {
                console.log(e)
                this.setState({
                    feeReminderSmsSentSuccessfully: true,
                    displayFeeReminderConfirmationModal: false,
                    displaySuccessForFeeReminderSmsBroadcast: false
                });
            }
        } else if (sendStudentsHomePerActualClassQueryPayload.feeBalanceQueryScenario === "PER_CLASS_FEE_QUERY") {
            const classId = sendStudentsHomePerActualClassQueryPayload.classId;
            const feeBalanceThreshold = sendStudentsHomePerActualClassQueryPayload.minimumFeeBalance;
            try {
                await simpleTransactionsServiceGet(
                    formatString("/statements/sms/send-fee-reminder-to-specific-class-stream-with-threshold" +
                        "?classId={0}&feeBalanceThreshold={1}&paymentDeadlineDate={2}"
                        , classId, feeBalanceThreshold, selectedFeePaymentDeadlineDate));
                this.setState({
                    feeReminderSmsSentSuccessfully: true,
                    displayFeeReminderConfirmationModal: false,
                    displaySuccessForFeeReminderSmsBroadcast: true
                });
            } catch (e) {
                console.log(e)
                this.setState({
                    feeReminderSmsSentSuccessfully: true,
                    displayFeeReminderConfirmationModal: false,
                    displaySuccessForFeeReminderSmsBroadcast: false
                });
            }
        } else {
            const feeBalanceThreshold = sendStudentsHomePerActualClassQueryPayload.minimumFeeBalance;
            try {
                await simpleTransactionsServiceGet(
                    formatString("/statements/sms/send-fee-reminder-to-entire-school-not-completed-school-with-threshold" +
                        "?feeBalanceThreshold={1}&paymentDeadlineDate={2}"
                        , feeBalanceThreshold, selectedFeePaymentDeadlineDate));
                this.setState({
                    feeReminderSmsSentSuccessfully: true,
                    displayFeeReminderConfirmationModal: false,
                    displaySuccessForFeeReminderSmsBroadcast: true
                });
            } catch (e) {
                console.log(e)
                this.setState({
                    feeReminderSmsSentSuccessfully: true,
                    displayFeeReminderConfirmationModal: false,
                    displaySuccessForFeeReminderSmsBroadcast: false
                });
            }
        }
    };

    handleSendFeeReminderRejectButtonClicked = () => {
        this.setState({displayFeeReminderConfirmationModal: false});
    };

    handleFeeReminderSuccessErrorModalExteriorClicked = () => {
        this.setState({feeReminderSmsSentSuccessfully: false});
    };

    render() {
        const {feeBalanceList} = this.props;
        const {
            formattedFeeReminderConfirmationPrompt,
            feeReminderSmsSentSuccessfully,
            displaySuccessForFeeReminderSmsBroadcast
        } = this.state;
        const tableHeaders = {
            columnZero: "#",
            columnOne: "Admission Number",
            columnTwo: "Student Name",
            columnThree: "Gender",
            columnFour: "Class",
            columnFive: "Residence",
            columnSix: "Total",
            columnSeven: "Term Balance",
            columnEight: "Annual Balance"
        };

        return (
            <div
                id="main"
                className={!feeBalanceList.length ? "balance__main-div" : ""}
            >
                {feeBalanceList && feeBalanceList.length ? (
                    <Table
                        tableTitle="Student's List"
                        tableHeaderObject={tableHeaders}
                        tableData={this.state.tableData}
                        handleRowIsClicked={this.handleTableRowIsClicked}
                        handleSecondUtilityIconClicked={this.handleSmsReminderIconClicked}
                    />
                ) : null}
                {!feeBalanceList.length ? <EmptySearchResponse/> : null}

                <Modal
                    visible={this.state.displayFeeStatementModal}
                    width="900"
                    height="600"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleFeeStatementModalExteriorClicked();
                    }}
                >
                    <FeeStatementView/>
                </Modal>

                <Modal
                    visible={this.state.displayDeadlineDateForm}
                    width="450"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleSmsReminderFormModalExteriorClicked();
                    }}
                >
                    <FeeReminderDeadlineDateForm
                        handleSubmitButtonIsClicked={this.handleReminderDeadlineDateFormSubmitButtonIsClicked}/>
                </Modal>

                <Modal
                    visible={this.state.displayFeeReminderConfirmationModal}
                    width="450"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleSendFeeReminderRejectButtonClicked();
                    }}
                >
                    <ActionConfirmationView title="Confirm to send fee sms reminder"
                                            promptText={formattedFeeReminderConfirmationPrompt}
                                            handleConfirmButtonClicked={this.handleSendFeeReminderConfirmButtonClicked}
                                            handleRejectButtonClicked={this.handleSendFeeReminderRejectButtonClicked}/>
                </Modal>
                {feeReminderSmsSentSuccessfully && (
                    <SuccessFailureModal isASuccess={displaySuccessForFeeReminderSmsBroadcast}
                                         eventMessage={displaySuccessForFeeReminderSmsBroadcast
                                             ? "Sms broadcast sent successfully"
                                             : "An error encountered while sending the broadcast message"}
                                         handleModalExteriorClicked={this.handleFeeReminderSuccessErrorModalExteriorClicked}/>)}
            </div>
        );
    }
}

FeeBalancePage.propTypes = {
    fetchAllStudents: PropTypes.func.isRequired,
    studentsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAStudentFeeStatement: PropTypes.func.isRequired,
    launchFeeStatementModal: PropTypes.func.isRequired,
    isResultsAvailable: PropTypes.bool,
    sendStudentsHomePerActualClassQueryPayload: PropTypes.object,
    feeBalanceList: PropTypes.arrayOf(PropTypes.object).isRequired
};

FeeBalancePage.defaultProps = {
    isResultsAvailable: false
};

const mapStateToProps = state => ({
    feeBalanceList: state.staff_home.feeBalances.feeBalanceList,
    sendStudentsHomePerActualClassQueryPayload: state.staff_home.feeBalances.sendStudentsHomePerActualClassQueryPayload
});

const mapDispatchToProps = dispatch => ({
    fetchAllStudents: () => dispatch(fetchAllStudents()),
    fetchAStudentFeeStatement: payload =>
        dispatch(fetchAStudentFeeStatement(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeBalancePage);
