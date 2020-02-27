import React, {Component} from 'react';
import PropTypes from "prop-types";

import './AccordionTable.scss';
import Accordion from "../accordion/Accordion";
import PrivilegeContent from "../accordion_content/privilege_content/PrivilegeContent";

class AccordionTable extends Component {
    state = {
        accordionData: []
    };

    componentDidMount() {
        this.setState({accordionData: this.props.accordionTableArray});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.accordionTableArray !== prevProps.accordionTableArray) {
            if(this.props.accordionTableArray && this.props.accordionTableArray.length) {
                this.setState({accordionData: this.props.accordionTableArray});
            }
        }
    }

    render() {

        const {
            accordionData
        } = this.state;

        return (
            <div className="table__main-body">
                {accordionData.map(i => (
                    <Accordion title={i.name} subtitle={i.accordionSubtitle}>
                        <PrivilegeContent userRoles={i.rolesArray}/>
                    </Accordion>
                ))}
            </div>
        );
    }
}


AccordionTable.propTypes = {
    accordionTableArray: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default AccordionTable;
