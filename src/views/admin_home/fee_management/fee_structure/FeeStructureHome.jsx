import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllFeeStructures,
     setupFeeStructuresForm
} from "../../../../store/modules/admin_home/actions";


class FeeStructureHome extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            columnZero: "#",
            columnOne: "Description",
            columnTwo: "Date created",
            columnThree: "Is the Current Fee Structure",
            columnFour: "Is the Prospect FeeStructure"
        }
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
                            FeeStructureDescription: item.FeeStructureDescription,
                            DateCreated: item.DateCreated,
                            IsCurrentFeeStructure: item.IsCurrentFeeStructure > 0 ? "Yes" : "No",
                            IsProspect: item.IsProspect > 0 ? "Yes" : "No"
                        };
                    }
                );

                this.setState({ tableData: allFeeStructures });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="level__table-div">
                    <Table
                        addIconClicked={() => {
                            this.props.setupFeeStructuresForm();
                        }}
                        tableTitle="Fee Structures"
                        tableHeaderObject={this.state.tableHeaders}
                        tableData={this.state.tableData}
                    />
                </div>
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
