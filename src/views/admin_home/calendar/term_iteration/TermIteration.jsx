import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./TermIteration.scss";
import {
  fetchAllTermIterations,
  setupTermIterationsForm
} from "../../../../store/modules/admin_home/actions";
import AdminDialog from "../../admin_dialog/AdminDialog";

class TermIteration extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Name"
    }
  };

  componentDidMount() {
    this.props.fetchAllTermIterations();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allTermIterations !== prevProps.allTermIterations) {
      if (this.props.allTermIterations && this.props.allTermIterations.length) {
        let allTermIterations = this.props.allTermIterations.map(
          (item, index) => {
            return {
              id: index + 1,
              TermIterationDescription: item.TermIterationDescription
            };
          }
        );

        this.setState({ tableData: allTermIterations });
      }
    }
  }

  render() {
    return (
      <div>
        <AdminDialog />
        <div className="level__table-div">
          <Table
            addIconClicked={() => {
              this.props.setupTermIterationsForm();
            }}
            tableTitle="Term Iterations"
            tableHeaderObject={this.state.tableHeaders}
            tableData={this.state.tableData}
          />
        </div>
      </div>
    );
  }
}

TermIteration.propTypes = {
  setupTermIterationsForm: PropTypes.func.isRequired,
  fetchAllTermIterations: PropTypes.func.isRequired,
  allTermIterations: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allTermIterations: state.admin_home.termIterations.allTermIterations
});

const mapDispatchToProps = dispatch => ({
  setupTermIterationsForm: () => dispatch(setupTermIterationsForm()),
  fetchAllTermIterations: () => dispatch(fetchAllTermIterations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermIteration);
