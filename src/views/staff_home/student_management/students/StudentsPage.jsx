import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import './StudentPage.scss';


import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllStudents,
    fetchAStudentFeeStatement
} from "../../../../store/modules/staff_home/actions";
import FeeStatementView from "../../fee_management/fee_statement/FeeStatementView";
import Modal from "react-awesome-modal";

class StudentsPage extends Component {

    state = {
        tableData: [],
        displayFeeStatementModal: false
    };
    componentDidMount() {
        this.props.fetchAllStudents();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.studentsList !== prevProps.studentsList) {
            if(this.props.studentsList && this.props.studentsList.length) {
                let studentsList = this.props.studentsList.map((item, index) => {
                    return {
                        id: index + 1,
                        admissionNumber: item.admissionNumber,
                        studentName: item.studentName,
                        gender: item.gender,
                        classDetails: item.classDetails,
                        residenceDetails: item.residenceDetails
                    };
                });

                this.setState({ tableData: studentsList });
            }
        }
    }

    displayLoader = () => {
        return (
            <Loader
                type="Audio"
                color="#ddd"
                height={100}
                width={100}
            />
        );
    };


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
        console.log("test");
        const tableHeaders = {
            columnZero: "#",
            columnOne: "Admission Number",
            columnTwo: "Student Name",
            columnThree: "Gender",
            columnFour: "Class",
            columnFive: "Residence"
        };

        return (
            <div id="main" className="student__student-main">
                <Table tableTitle="Student's List" tableHeaderObject={tableHeaders} tableData={this.state.tableData} handleRowIsClicked={this.handleTableRowIsClicked}/>
                <div className="student__loader">
                    {this.displayLoader()}
                </div>
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

StudentsPage.propTypes = {
    fetchAllStudents: PropTypes.func.isRequired,
    studentsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAStudentFeeStatement: PropTypes.func.isRequired,
    launchFeeStatementModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    studentsList: state.staff_home.students.studentsList
});

const mapDispatchToProps = dispatch => ({
    fetchAllStudents: () => dispatch(fetchAllStudents()),
    fetchAStudentFeeStatement: payload => dispatch(fetchAStudentFeeStatement(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentsPage);
