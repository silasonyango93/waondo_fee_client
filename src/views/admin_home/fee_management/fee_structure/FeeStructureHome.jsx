import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllFeeStructures,
    setupFeeStructuresForm
} from "../../../../store/modules/admin_home/actions";
import Modal from "react-awesome-modal";
import FeeStructuresModal from "./FeeStructuresModal";
import {transactionsServicePost} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";
import EditFeeBreakDownModal from "./EditFeeBreakDownModal";
import DuplicateFeeStructureModal from "./DuplicateFeeStructureModal";


class FeeStructureHome extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            columnZero: "#",
            columnOne: "Description",
            columnTwo: "Date created",
            columnThree: "Is the Current Fee Structure",
            columnFour: "Is the Prospect FeeStructure",
            columnFive: "Reference"
        },
        isFeeStructureModalDisplayed: false,
        classFeeStructureModelList: [],
        rowDuplicationPayload: "",
        isRowDuplicationModalDisplayed: false
    };

    componentDidMount() {
        this.props.fetchAllFeeStructures();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.allFeeStructures !== prevProps.allFeeStructures
        ) {
            if (this.props.allFeeStructures && this.props.allFeeStructures.length) {
                let allFeeStructures = this.props.allFeeStructures.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            FeeStructureDescription: item.feeStructureDescription,
                            DateCreated: item.dateCreated,
                            IsCurrentFeeStructure: item.isCurrentFeeStructure > 0 ? "Yes" : "No",
                            IsProspect: item.isProspectFeeStructure > 0 ? "Yes" : "No",
                            reference: item.encodedFeeStructureId,
                            payload: item
                        };
                    }
                );

                this.setState({tableData: allFeeStructures});
            }
        }
    }

    feeStructureItemIsClicked = async feeStructureObject => {
        const {feeStructureId} = feeStructureObject;
        const payload = {
            feeStructureId: feeStructureId
        };
        const classFeeStructureModelList = await transactionsServicePost(
            payload,
            "/class_fee_structure/retrieve_class_fee_structures_of_a_fee_structure"
        );

        await this.setState({classFeeStructureModelList: classFeeStructureModelList.data});

        this.setState({isFeeStructureModalDisplayed: true});
    };

    handleFeeStructureModalExteriorClicked = () => {
        this.setState({isFeeStructureModalDisplayed: false});
    };

    handleRowDuplicationIsClicked = async payload => {
        await this.setState({rowDuplicationPayload: payload});
        await this.setState({isRowDuplicationModalDisplayed: true});
    };

    closeFeeStructureDuplicationModal = () => {
        this.setState({isRowDuplicationModalDisplayed: false});
    };

    render() {
        const {sessionDetails} = this.props;
        return (
            <div>
                <div>
                    <Table
                        addIconClicked={() => {
                            this.props.setupFeeStructuresForm();
                        }}
                        tableTitle="Fee Structures"
                        tableHeaderObject={this.state.tableHeaders}
                        tableData={this.state.tableData}
                        isRowMoreDetailsRequired={true}
                        handleRowMoreDetailsIsClicked={this.feeStructureItemIsClicked}
                        isRowDuplicationRequired={true}
                        handleRowDuplicationIsClicked={this.handleRowDuplicationIsClicked}
                    />
                </div>
                <Modal
                    visible={this.state.isFeeStructureModalDisplayed}
                    width="900"
                    height="750"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleFeeStructureModalExteriorClicked();
                    }}
                >
                    <FeeStructuresModal classFeeStructureModelList={this.state.classFeeStructureModelList}/>
                </Modal>
                <Modal
                    visible={this.state.isRowDuplicationModalDisplayed}
                    width="500"
                    height="350"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.setState({isRowDuplicationModalDisplayed: false})
                    }}
                >
                    <DuplicateFeeStructureModal feeStructureId={this.state.rowDuplicationPayload.feeStructureId}
                                                userId={sessionDetails && sessionDetails.userId
                                                    ? sessionDetails.userId
                                                    : "N/A"} closeModal={()=>{this.closeFeeStructureDuplicationModal();}}/>
                </Modal>
            </div>
        );
    }
}


FeeStructureHome.propTypes = {
    setupFeeStructuresForm: PropTypes.func.isRequired,
    fetchAllFeeStructures: PropTypes.func.isRequired,
    allFeeStructures: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allFeeStructures: state.admin_home.feeStructure.allFeeStructures,
    sessionDetails: state.current_session.sessionDetails
});

const mapDispatchToProps = dispatch => ({
    setupFeeStructuresForm: () => dispatch(setupFeeStructuresForm()),
    fetchAllFeeStructures: () => dispatch(fetchAllFeeStructures())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeStructureHome);
