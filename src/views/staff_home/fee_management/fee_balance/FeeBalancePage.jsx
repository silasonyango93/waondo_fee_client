import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";


import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllStudents,
    fetchAStudentFeeStatement
} from "../../../../store/modules/staff_home/actions";
import FeeStatementView from "../../fee_management/fee_statement/FeeStatementView";
import Modal from "react-awesome-modal";
import EmptySearchResponse from "../../../../components/empty_search_response/EmptySearchResponse";
import './FeeBalancePage.scss';

class FeeBalancePage extends Component {

    state = {
        tableData: [],
        displayFeeStatementModal: false
    };
    componentDidMount() {
        this.props.fetchAllStudents();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.feeBalanceList !== prevProps.feeBalanceList) {
            if(this.props.feeBalanceList && this.props.feeBalanceList.length) {
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
                        annualBalance: item.annualBalance,
                    };
                });

                this.setState({ tableData: feeBalanceList });
            }
        }
    }


    handleTableRowIsClicked = async (rowObject) =>{
        const payload = {
            admissionNumber: rowObject.admissionNumber
        };

        await this.props.fetchAStudentFeeStatement(payload);
        this.props.launchFeeStatementModal();

    };

    handleFeeStatementModalExteriorClicked = () => {
        this.setState({ displayFeeStatementModal: false });
    };


    render() {

        const { feeBalanceList } = this.props;

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
            <div id="main" className={!feeBalanceList.length ? "balance__main-div" : ""}>
                {feeBalanceList && feeBalanceList.length ? (<Table tableTitle="Student's List" tableHeaderObject={tableHeaders} tableData={this.state.tableData} handleRowIsClicked={this.handleTableRowIsClicked}/>) : null}
                {!feeBalanceList.length ? (<EmptySearchResponse />) : null}

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
    fetchAStudentFeeStatement: payload => dispatch(fetchAStudentFeeStatement(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeBalancePage);
