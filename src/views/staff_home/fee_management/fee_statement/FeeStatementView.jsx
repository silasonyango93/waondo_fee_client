import React, {Component} from 'react';
import { Columns } from "react-bulma-components/dist";

import './FeeStatementView.scss';
import Table from "../../../../components/table/table_body/Table";

class FeeStatementView extends Component {

    generatePdf = () => {
        // const element = document.getElementById("fee-statement");
        // html2pdf()
        //     .set({ html2canvas: { scale: 4 } })
        //     .from(element)
        //     .save();
    };

    render() {
        return (
            <div className="statement__main-body" id="fee-statement">
                <div className="statement__top-section">
                    <Columns>
                        <Columns.Column size="one-quarter">
                            <div className="statement__pic-div"></div>
                        </Columns.Column>
                        <Columns.Column>
                            <div className="statement__name-div">
                                <h1 className="statement__student-name">Silas Onyango</h1>
                            </div>

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
                        <td>8032</td>
                        <td>Form One Yellow</td>
                        <td>Boarder</td>
                        <td>50,000</td>
                        <td>10,000</td>
                        <td>20,000</td>
                    </tr>
                    </tbody>
                </table>

                <Columns className="statement__installments-div is-gapless">
                    <Columns.Column>
                <Table />
                    </Columns.Column>
                    <Columns.Column size="one-quarter" />
                </Columns>
            </div>
        );
    }
}

export default FeeStatementView;
