import React, {Component} from 'react';
import Table from "../../../../components/table/table_body/Table";
import TitlePanel from "../../../../components/title_panel/TitlePanel";

class StudentsPage extends Component {
    render() {
        return (
            <div>
                <TitlePanel />
                <Table />
            </div>
        );
    }
}

export default StudentsPage;
