import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./WeekIteration.scss";
import {
  fetchAllWeekIterations,
  setupWeekIterationsForm
} from "../../../../store/modules/admin_home/actions";

class WeekIteration extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Name"
    }
  };

  componentDidMount() {
    this.props.fetchAllWeekIterations();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allWeekIterations !== prevProps.allWeekIterations) {
      if (this.props.allWeekIterations && this.props.allWeekIterations.length) {
        let allWeekIterations = this.props.allWeekIterations.map(
          (item, index) => {
            return {
              id: index + 1,
              WeekIterationDescription: item.WeekIterationDescription
            };
          }
        );

        this.setState({ tableData: allWeekIterations });
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <Table
            addIconClicked={() => {
              this.props.setupWeekIterationsForm();
            }}
            tableTitle="Week Iterations"
            tableHeaderObject={this.state.tableHeaders}
            tableData={this.state.tableData}
          />
        </div>
      </div>
    );
  }
}

WeekIteration.propTypes = {
  setupWeekIterationsForm: PropTypes.func.isRequired,
  fetchAllWeekIterations: PropTypes.func.isRequired,
  allWeekIterations: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allWeekIterations: state.admin_home.weekIterations.allWeekIterations
});

const mapDispatchToProps = dispatch => ({
  setupWeekIterationsForm: () => dispatch(setupWeekIterationsForm()),
  fetchAllWeekIterations: () => dispatch(fetchAllWeekIterations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekIteration);
