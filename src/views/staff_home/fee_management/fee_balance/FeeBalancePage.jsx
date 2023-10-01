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
    promiselessTransactionsServiceGetAll
} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";

class FeeBalancePage extends Component {
    state = {
        tableData: [],
        displayFeeStatementModal: false,
        displayDeadlineDateForm: false,
        displayFeeReminderConfirmationModal: false,
        selectedFeePaymentDeadlineDate: ""
    };

    componentDidMount() {
        this.props.fetchAllStudents();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
        this.setState({displayDeadlineDateForm: false, selectedFeePaymentDeadlineDate: deadlineDate, displayFeeReminderConfirmationModal: true});
    };

    handleSendFeeReminderConfirmButtonClicked = () => {

    };

    handleSendFeeReminderRejectButtonClicked = () => {

    };

    processSmsFeeReminderModalPrompt = () => {
        // const {sendStudentsHomeQueryPayload} = this.props;
        // if (sendStudentsHomeQueryPayload.classId) {
        //     const classDetails = await
        //         promiselessTransactionsServiceGetAll(
        //             "/academic-classes/class-details/fetch-class-by-its-full-name?classId="
        //             + sendStudentsHomeQueryPayload.classId);
        //     return formatString("You are about to send a broadcast message reminder to parents of {0} with fee balances equal " +
        //         "to or greater than {1} to pay fees by date {2}", classDetails.data.AcademicClassLevelName + classDetails.data.ClassStreamName
        //         , currencyDisplay(sendStudentsHomeQueryPayload.minimumFeeBalance), this.state.selectedPaymentDeadlineDate);
        // } else return "";

        return formatString("You are about to send a broadcast message reminder to parents of {0} with fee balances equal " +
            "to or greater than {1} to pay fees by date {2}", "1Y"
            , currencyDisplay("7000"), this.state.selectedFeePaymentDeadlineDate);
    }

    render() {
        const {feeBalanceList} = this.props;
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
                    <ActionConfirmationView title="Confirm to send fee sms reminder" promptText={this.processSmsFeeReminderModalPrompt()}
                                            handleConfirmButtonClicked={this.handleSendFeeReminderConfirmButtonClicked}
                                            handleRejectButtonClicked={this.handleSendFeeReminderRejectButtonClicked}/>
                </Modal>
            </div>
        );
    }
}

FeeBalancePage.propTypes = {
    fetchAllStudents: PropTypes.func.isRequired,
    studentsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAStudentFeeStatement: PropTypes.func.isRequired,
    launchFeeStatementModal: PropTypes.func.isRequired,
    isResultsAvailable: PropTypes.bool
};

FeeBalancePage.defaultProps = {
    isResultsAvailable: false
};

const mapStateToProps = state => ({
    feeBalanceList: state.staff_home.feeBalances.feeBalanceList
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
