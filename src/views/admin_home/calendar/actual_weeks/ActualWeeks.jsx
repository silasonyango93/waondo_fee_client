import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./ActualWeeks.scss";
import {
  fetchAyearsActualWeeks,
  setupActualWeeksForm
} from "../../../../store/modules/admin_home/actions";
import AdminDialog from "../../admin_dialog/AdminDialog";

class ActualWeeks extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Week",
      columnTwo: "Term",
      columnFour: "Year"
    }
  };

  componentDidMount() {
    const payload = {
      year: new Date().getFullYear()
    };
    this.props.fetchAyearsActualWeeks(payload);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allYearsWeeks !== prevProps.allYearsWeeks) {
      if (this.props.allYearsWeeks && this.props.allYearsWeeks.length) {
        let allYearsWeeks = this.props.allYearsWeeks.map((item, index) => {
          return {
            id: index + 1,
            WeekIterationDescription: item.WeekIterationDescription,
            TermIterationDescription: item.TermIterationDescription,
            Year: item.Year
          };
        });

        this.setState({ tableData: allYearsWeeks });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="level__table-div">
          <Table
            addIconClicked={() => {
              this.props.setupActualWeeksForm();
            }}
            tableTitle="Actual Weeks"
            tableHeaderObject={this.state.tableHeaders}
            tableData={this.state.tableData}
          />
        </div>
      </div>
    );
  }
}

ActualWeeks.propTypes = {
  setupActualWeeksForm: PropTypes.func.isRequired,
  fetchAyearsActualWeeks: PropTypes.func.isRequired,
  allYearsWeeks: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allYearsWeeks: state.admin_home.actualWeeks.allYearsWeeks
});

const mapDispatchToProps = dispatch => ({
  setupActualWeeksForm: () => dispatch(setupActualWeeksForm()),
  fetchAyearsActualWeeks: payload => dispatch(fetchAyearsActualWeeks(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActualWeeks);
