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
        classFeeStructureModelList: []
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
                            reference: item.encodedFeeStructureId
                        };
                    }
                );

                this.setState({tableData: allFeeStructures});
            }
        }
    }

    feeStructureItemIsClicked = async feeStructureObject => {
        const { reference } = feeStructureObject;
        const payload = {
            encodedFeeStructureId: reference
        };
        const classFeeStructureModelList = await transactionsServicePost(
            payload,
            "/class_fee_structure/retrieve_class_fee_structures_using_encoded_fee_structure_id"
        );

        await this.setState({ classFeeStructureModelList: classFeeStructureModelList.data });

        this.setState({isFeeStructureModalDisplayed: true});
    };

    handleFeeStructureModalExteriorClicked = () => {
        this.setState({isFeeStructureModalDisplayed: false});
    };

    render() {
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
                        handleRowIsClicked={this.feeStructureItemIsClicked}
                    />
                </div>
                <Modal
                    visible={this.state.isFeeStructureModalDisplayed}
                    width="900"
                    height="600"
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.handleFeeStructureModalExteriorClicked();
                    }}
                >
                    <FeeStructuresModal classFeeStructureModelList={this.state.classFeeStructureModelList}/>
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
    allFeeStructures: state.admin_home.feeStructure.allFeeStructures
});

const mapDispatchToProps = dispatch => ({
    setupFeeStructuresForm: () => dispatch(setupFeeStructuresForm()),
    fetchAllFeeStructures: () => dispatch(fetchAllFeeStructures())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeStructureHome);
