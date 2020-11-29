import React, {Component} from 'react';
import PropTypes from "prop-types";

import Accordion from "../../../../components/accordion/Accordion";

class FeeStructuresModal extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.classFeeStructureModelList != prevProps.classFeeStructureModelList) {
            if (this.props.classFeeStructureModelList && this.props.classFeeStructureModelList.length) {
                this.populateAccordions(this.props.classFeeStructureModelList);
            }
        }
    }

    populateAccordions = classFeeStructureArray => {
        let accordions = [];
        for (let i = 0;i < classFeeStructureArray.length; i++) {
            accordions.push(<Accordion title={classFeeStructureArray[i].academicClassLevelName}
                                       subtitle={classFeeStructureArray[i].feeStructureDescription}/>)
        }
        return accordions;
    }

    render() {
        return (
            <div>
                {this.populateAccordions(this.props.classFeeStructureModelList)}
            </div>
        );
    }
}

FeeStructuresModal.propTypes = {
    classFeeStructureModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FeeStructuresModal;
