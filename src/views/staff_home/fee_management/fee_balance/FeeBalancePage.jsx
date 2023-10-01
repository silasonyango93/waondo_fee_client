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

class FeeBalancePage extends Component {
    state = {
        tableData: [],
        displayFeeStatementModal: false,
        displayDeadlineDateForm: false,
        displayFeeReminderConfirmationModal: false
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

    handleReminderDeadlineDateFormSubmitButtonIsClicked = (deadlineDate) => {
        this.setState({displayDeadlineDateForm: false, displayFeeReminderConfirmationModal: true});
    };

    handleSendFeeReminderConfirmButtonClicked = () => {

    };

    handleSendFeeReminderRejectButtonClicked = () => {

    };

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
                    <ActionConfirmationView title="Confirm to send fee sms reminder" promptText="Prompt"
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
