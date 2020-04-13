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
                <i className="fa fa-edit fa-fw table__action-icon" onClick={()=>{this.props.callToActionFunction()}}/>
                {accordionData.map(i => (
                    <Accordion title={i.name} subtitle={i.accordionSubtitle}>
                        <PrivilegeContent userRoles={i.userRolesDtoList}/>
                    </Accordion>
                ))}
            </div>
        );
    }
}


AccordionTable.propTypes = {
    accordionTableArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    callToActionFunction: PropTypes.func.isRequired
};


export default AccordionTable;
