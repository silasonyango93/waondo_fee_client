import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Table from "../../../../components/table/table_body/Table";
import html2canvas from 'html2canvas';
import {fetchAllStudents} from "../../../../store/modules/staff_home/actions";

class StudentsPage extends Component {

    state = {
        tableData: []
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

    printDiv = () =>{
        html2canvas(document.getElementById("main"), {scale: 8}).then(canvas => {
            var link = document.createElement('a');
            link.download = 'receipt.png';
            link.href = canvas.toDataURL()
            link.click();
        });
    };
    render() {

        const tableHeaders = {
            columnZero: "#",
            columnOne: "Admission Number",
            columnTwo: "Student Name",
            columnThree: "Gender",
            columnFour: "Class",
            columnFive: "Residence"
        }

        return (
            <div id="main">
                <Table tableTitle="Student's List" tableHeaderObject={tableHeaders} tableData={this.state.tableData}/>
            </div>
        );
    }
}

StudentsPage.propTypes = {
    fetchAllStudents: PropTypes.func.isRequired,
    studentsList: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    studentsList: state.staff_home.students.studentsList
});

const mapDispatchToProps = dispatch => ({
    fetchAllStudents: () => dispatch(fetchAllStudents())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentsPage);
