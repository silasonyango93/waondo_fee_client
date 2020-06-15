import React, {Component} from 'react';
import { Columns } from "react-bulma-components/dist";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import './FeeStatementView.scss';
import Table from "../../../../components/table/table_body/Table";
import html2pdf from "html2pdf.js";
import {ip} from "../../../../config/EndPoint";
import schoolLogo from '../../../../assets/waondo.png';
import html2canvas from "html2canvas";


class FeeStatementView extends Component {

    state = {
        tableData: [],
        currentStudentFeeStatement: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentStudentFeeStatement !== prevProps.currentStudentFeeStatement) {
            if(this.props.currentStudentFeeStatement && this.props.currentStudentFeeStatement.installmentsResponseArray && this.props.currentStudentFeeStatement.installmentsResponseArray.length) {
                let installments = this.props.currentStudentFeeStatement.installmentsResponseArray.map((item, index) => {
                    return {
                        id: index + 1,
                        installmentAmount: item.installmentAmount,
                        installmentDate: item.installmentDate,
                        isCarryForward: item.isCarryForward === 1 ? 'Yes' : 'No',
                        termDetails: item.termDetails,
                        bursarName: item.bursarName
                    };
                });

                this.setState({ tableData: installments });
            }
        }
    }

    generatePdf = () => {
        const element = document.getElementById("fee-statement");
        html2pdf()
            .set({ html2canvas: { scale: 8 } })
            .from(element)
            .save();
    };

    printDiv = () =>{
        html2canvas(document.getElementById("fee-statement"), {scale: 8}).then(canvas => {
            var link = document.createElement('a');
            link.download = 'receipt.png';
            link.href = canvas.toDataURL()
            link.click();
        });
    };

    render() {

        const tableHeader = {
            hash: '#',
            installmentAmount: 'Amount',
            installmentDate: 'Date',
            isACarryForward: 'Is A Carry Forward',
            term: 'Term',
            staff: 'Staff'
        }

        const {
            currentStudentFeeStatement
        } = this.props;

        return (
            <div className="statement__main-body" id="fee-statement">
                <div className="statement__top-section">
                    <Columns className="is-gapless">
                        <Columns.Column size="one-quarter">
                            <img className="statement__pic-div" src={ip + "/web_display_image?imageID=" + currentStudentFeeStatement.profPicName}></img>
                            <p>{currentStudentFeeStatement.studentName}</p>
                        </Columns.Column>
                        <Columns.Column>
                            <div className="statement__name-div">
                                <div className="statement__school-details-div">
                                    <h1 className="statement__school-name">WAONDO SECONDARY SCHOOL</h1>
                                    <div className="statement__motto-prompt">MOTTO</div>
                                    <div className="statement__motto">STRIVE FOR EXCELLENCE</div>
                                </div>

                            </div>

                        </Columns.Column>
                        <Columns.Column size="one-quarter">
                            <img className="statement__pic-div" src={schoolLogo}></img>
                        </Columns.Column>
                    </Columns>


                </div>

                <table width="100%" className="statement__statement-table table table-striped table-bordered table-hover" id="dataTables-example">
                    <thead>
                    <tr>

                        <th>Admission Number</th>
                        <th>Class</th>
                        <th>Residence</th>
                        <th>Total</th>
                        <th>Term balance</th>
                        <th>Annual balance</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="gradeA">
                        <td>{currentStudentFeeStatement.admissionNumber}</td>
                        <td>{currentStudentFeeStatement.classDetails}</td>
                        <td>{currentStudentFeeStatement.residenceDetails}</td>
                        <td>{currentStudentFeeStatement.currentyearTotal}</td>
                        <td>{currentStudentFeeStatement.termBalance}</td>
                        <td>{currentStudentFeeStatement.annualBalance}</td>
                    </tr>
                    </tbody>
                </table>

                <Columns className="statement__installments-div is-gapless">
                    <Columns.Column>
                <Table tableTitle="Fee Installments" tableHeaderObject={tableHeader} tableData={this.state.tableData}/>
                    </Columns.Column>
                    <Columns.Column size="one-quarter" />
                </Columns>
            </div>
        );
    }
}

FeeStatementView.propTypes = {
    profPicName: PropTypes.string.isRequired,
    currentStudentFeeStatement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentStudentFeeStatement: state.staff_home.feeManagement.currentStudentFeeStatement
});


export default connect(
    mapStateToProps,
    null
)(FeeStatementView);
