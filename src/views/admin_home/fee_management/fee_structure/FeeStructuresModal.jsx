import React, {Component} from 'react';
import PropTypes from "prop-types";

import Accordion from "../../../../components/accordion/Accordion";
import './FeeStructureModal.scss'
import Table from "../../../../components/table/table_body/Table";

class FeeStructuresModal extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.classFeeStructureModelList != prevProps.classFeeStructureModelList) {
            if (this.props.classFeeStructureModelList && this.props.classFeeStructureModelList.length) {
                this.populateAccordions(this.props.classFeeStructureModelList);
            }
        }
    }

    populateAccordions = classFeeStructureArray => {
        let feeBreakDownHeaderObject = {
            columnOne: "#",
            columnTwo: "Term",
            columnThree: "Residence",
            columnFour: "Fee Amount"
        };
        let accordions = [];
        for (let i = 0; i < classFeeStructureArray.length; i++) {
            accordions.push(<Accordion title={classFeeStructureArray[i].academicClassLevelName}
                                       subtitle={classFeeStructureArray[i].feeStructureDescription}
            >
                <Table tableTitle="Fee BreakDown" tableHeaderObject={feeBreakDownHeaderObject}
                       tableData={this.mapFeeBreakDownData(classFeeStructureArray[i].classFeeStructureBreakDown)}/>
                <br/>
                <Table/>
            </Accordion>)
        }
        return accordions;
    };

    mapFeeBreakDownData = feeBreakDownData => {
        let mappedFeeBreakDownData = feeBreakDownData.map(
            (item, index) => {
                return {
                    id: index + 1,
                    termIterationDescription: item.termIterationDescription,
                    studentResidenceDescription: item.studentResidenceDescription,
                    feeAmount: item.feeAmount
                };
            }
        );
        return mappedFeeBreakDownData;
    };

    render() {
        return (
            <div>
                <div className="structure-modal__accordions_wrapper">
                    {this.populateAccordions(this.props.classFeeStructureModelList)}
                </div>
            </div>
        );
    }
}

FeeStructuresModal.propTypes = {
    classFeeStructureModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FeeStructuresModal;
