import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./LotDescription.scss";
import {
     fetchAllLotDescriptions,
     setupLotDescriptionsForm
} from "../../../../store/modules/admin_home/actions";

class LotDescription extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            columnZero: "#",
            columnOne: "Name"
        }
    };

    componentDidMount() {
        this.props.fetchAllLotDescriptions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allLotDescriptions !== prevProps.allLotDescriptions) {
            if (this.props.allLotDescriptions && this.props.allLotDescriptions.length) {
                let allLotDescriptions = this.props.allLotDescriptions.map((item, index) => {
                    return {
                        id: index + 1,
                        LotDescription: item.LotDescription
                    };
                });

                this.setState({ tableData: allLotDescriptions });
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Table
                        addIconClicked={() => {
                            this.props.setupLotDescriptionsForm();
                        }}
                        tableTitle="Lot Descriptions"
                        tableHeaderObject={this.state.tableHeaders}
                        tableData={this.state.tableData}
                    />
                </div>
            </div>
        );
    }
}

LotDescription.propTypes = {
    setupLotDescriptionsForm: PropTypes.func.isRequired,
    fetchAllLotDescriptions: PropTypes.func.isRequired,
    allLotDescriptions: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allLotDescriptions: state.admin_home.lotDescriptions.allLotDescriptions
});

const mapDispatchToProps = dispatch => ({
    setupLotDescriptionsForm: () => dispatch(setupLotDescriptionsForm()),
    fetchAllLotDescriptions: () => dispatch(fetchAllLotDescriptions())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LotDescription);
