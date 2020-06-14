import React, {Component} from 'react';
import Table from "../../../../components/table/table_body/Table";
import html2canvas from 'html2canvas';

class StudentsPage extends Component {

    printDiv = () =>{
        html2canvas(document.getElementById("main"), {scale: 8}).then(canvas => {
            var link = document.createElement('a');
            link.download = 'receipt.png';
            link.href = canvas.toDataURL()
            link.click();
        });
    };
    render() {
        return (
            <div id="main">
                <Table />
            </div>
        );
    }
}

export default StudentsPage;
