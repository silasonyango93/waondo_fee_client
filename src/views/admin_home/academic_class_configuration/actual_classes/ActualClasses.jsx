import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./ActualClasses.scss";
import {
    fetchAllActualClasses, setupActualClassesForm,
    setupActualLotsForm,
} from "../../../../store/modules/admin_home/actions";

class ActualClasses extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            columnZero: "#",
            columnOne: "Lot Description",
            columnTwo: "Class Stream",
            columnFour: "Registration Date"
        }
    };

    componentDidMount() {
        this.props.fetchAllActualClasses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allActualClasses !== prevProps.allActualClasses) {
            if (this.props.allActualClasses && this.props.allActualClasses.length) {
                let allActualClasses = this.props.allActualClasses.map((item, index) => {
                    return {
                        id: index + 1,
                        LotDescription: item.LotDescription,
                        ClassStreamName: item.ClassStreamName,
                        RegisteredDate: item.RegisteredDate
                    };
                });

                this.setState({ tableData: allActualClasses });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="level__table-div">
                    <Table
                        addIconClicked={() => {
                            this.props.setupActualClassesForm();
                        }}
                        tableTitle="Actual Lots"
                        tableHeaderObject={this.state.tableHeaders}
                        tableData={this.state.tableData}
                    />
                </div>
            </div>
        );
    }
}

ActualClasses.propTypes = {
    setupActualClassesForm: PropTypes.func.isRequired,
    fetchAllActualClasses: PropTypes.func.isRequired,
    allActualClasses: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    allActualClasses: state.admin_home.actualClasses.allActualClasses
});

const mapDispatchToProps = dispatch => ({
    setupActualClassesForm: () => dispatch(setupActualClassesForm()),
    fetchAllActualClasses: () => dispatch(fetchAllActualClasses())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActualClasses);
