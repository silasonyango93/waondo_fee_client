import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllFeeStructures,
    setupFeeComponentRegistrationForm
} from "../../../../store/modules/admin_home/actions";


class FeeStructureHome extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            columnZero: "#",
            columnOne: "Description",
            columnTwo: "Date created",
            columnThree: "Is Current Fee Structure",
            columnFour: "Is ProspectFeeStructure"
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
                            IsCurrentFeeStructure: item.IsCurrentFeeStructure,
                            IsProspect: item.IsProspect
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
                            this.props.setupFeeComponentRegistrationForm();
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
    setupFeeComponentRegistrationForm: PropTypes.func.isRequired,
    fetchAllFeeStructures: PropTypes.func.isRequired,
    allFeeStructures: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allFeeStructures: state.admin_home.feeStructure.allFeeStructures
});

const mapDispatchToProps = dispatch => ({
    setupFeeComponentRegistrationForm: () => dispatch(setupFeeComponentRegistrationForm()),
    fetchAllFeeStructures: () => dispatch(fetchAllFeeStructures())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeStructureHome);
