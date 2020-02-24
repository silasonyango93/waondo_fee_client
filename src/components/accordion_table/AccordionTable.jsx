import React, {Component} from 'react';

import './AccordionTable.scss';
import Accordion from "../accordion/Accordion";
import PrivilegeContent from "../accordion_content/privilege_content/PrivilegeContent";

class AccordionTable extends Component {
    render() {
        return (
            <div className="table__main-body">
                <Accordion>
                    <PrivilegeContent />
                </Accordion>
            </div>
        );
    }
}

export default AccordionTable;
