import React, {Component} from 'react';
import PropTypes from "prop-types";

import Accordion from "../../../../components/accordion/Accordion";
import './FeeStructureModal.scss'
import Table from "../../../../components/table/table_body/Table";
import Modal from "react-awesome-modal";
import EditFeeBreakDownModal from "./EditFeeBreakDownModal";

class FeeStructuresModal extends Component {

    state = {
        isRowEditModalDisplayed: false,
        currentRowPayload: ""
    };

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
        let feeComponentHeaderObject = {
            columnOne: "#",
            columnTwo: "Fee Item",
            columnThree: "Ratio(%)"
        };
        let accordions = [];
        for (let i = 0; i < classFeeStructureArray.length; i++) {
            accordions.push(<Accordion title={classFeeStructureArray[i].academicClassLevelName}
                                       subtitle={classFeeStructureArray[i].feeStructureDescription}
            >
                <Table tableTitle="Fee BreakDown" tableHeaderObject={feeBreakDownHeaderObject}
                       tableData={this.mapFeeBreakDownData(classFeeStructureArray[i].classFeeStructureBreakDown)}
                       isRowEditingRequired={true} handleRowEditIsClicked={this.handleRowEditingIsClicked}
                       isRowDuplicationRequired={true}
                       handleRowDuplicationIsClicked={this.handleRowDuplicationIsClicked}/>
                <br/>
                <Table tableTitle="Fee Items" tableHeaderObject={feeComponentHeaderObject}
                       tableData={this.mapFeeComponentData(classFeeStructureArray[i].classFeeStructureComponents)}/>
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
                    feeAmount: item.feeAmount,
                    payload: item
                };
            }
        );
        return mappedFeeBreakDownData;
    };

    mapFeeComponentData = feeComponentData => {
        let mappedFeeComponentData = feeComponentData.map(
            (item, index) => {
                return {
                    id: index + 1,
                    feeComponentDescription: item.feeComponentDescription,
                    feeComponentRatio: item.feeComponentRatio,
                    payload: item
                };
            }
        );
        return mappedFeeComponentData;
    };


    handleRowEditingIsClicked = async payload => {
        await this.setState({currentRowPayload: payload});
        await this.setState({isRowEditModalDisplayed: true});
    };

    handleRowDuplicationIsClicked = payload => {

    };

    closeFeeStructureEditModal = () => {
        this.setState({isRowEditModalDisplayed: false});
    };

    render() {
        return (
            <div>
                <div className="structure-modal__accordions_wrapper">
                    {this.populateAccordions(this.props.classFeeStructureModelList)}
                </div>
                <Modal
                    visible={this.state.isRowEditModalDisplayed}
                    width="500"
                    height="350"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.setState({isRowEditModalDisplayed: false})
                    }}
                >
                    <EditFeeBreakDownModal
                        classFeeStructureBreakDownId={this.state.currentRowPayload.classFeeStructureBreakDownId}
                        initialFeeAmount={this.state.currentRowPayload.feeAmount}
                        closeModal={this.closeFeeStructureEditModal}/>
                </Modal>
            </div>
        );
    }
}

FeeStructuresModal.propTypes = {
    classFeeStructureModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FeeStructuresModal;
