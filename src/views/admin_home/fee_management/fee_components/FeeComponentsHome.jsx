import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Table from "../../../../components/table/table_body/Table";
import {
    fetchAllFeeComponents,
    setupFeeComponentRegistrationForm
} from "../../../../store/modules/admin_home/actions";


class FeeComponentsHome extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            columnZero: "#",
            columnOne: "Fee Component"
        }
    };

    componentDidMount() {
        this.props.fetchAllFeeComponents();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.allFeeComponents !== prevProps.allFeeComponents
        ) {
            if (this.props.allFeeComponents && this.props.allFeeComponents.length) {
                let allFeeComponents = this.props.allFeeComponents.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            FeeComponentDescription: item.FeeComponentDescription
                        };
                    }
                );

                this.setState({ tableData: allFeeComponents });
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Table
                        addIconClicked={() => {
                            this.props.setupFeeComponentRegistrationForm();
                        }}
                        tableTitle="Fee Components"
                        tableHeaderObject={this.state.tableHeaders}
                        tableData={this.state.tableData}
                    />
                </div>
            </div>
        );
    }
}


FeeComponentsHome.propTypes = {
    setupFeeComponentRegistrationForm: PropTypes.func.isRequired,
    fetchAllFeeComponents: PropTypes.func.isRequired,
    allFeeComponents: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allFeeComponents: state.admin_home.feeComponents.allFeeComponents
});

const mapDispatchToProps = dispatch => ({
    setupFeeComponentRegistrationForm: () => dispatch(setupFeeComponentRegistrationForm()),
    fetchAllFeeComponents: () => dispatch(fetchAllFeeComponents())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeComponentsHome);
