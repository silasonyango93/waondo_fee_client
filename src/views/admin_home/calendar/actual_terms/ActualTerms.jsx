import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./ActualTerms.scss";
import {
  fetchAllActualTerms,
  setupActualTermsForm
} from "../../../../store/modules/admin_home/actions";
import AdminDialog from "../../admin_dialog/AdminDialog";

class ActualTerms extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Name",
      columnTwo: "Term Start Date",
      columnThree: "Term End Date",
      columnFour: "Year"
    }
  };

  componentDidMount() {
    const payload = {
      TableOne: "term_iterations",
      JoiningKey: "TermIterationId",
      SearchColumn: "Year",
      SearchValue: new Date().getFullYear()
    };
    this.props.fetchAllActualTerms(payload);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allActualTerms !== prevProps.allActualTerms) {
      if (this.props.allActualTerms && this.props.allActualTerms.length) {
        let allActualTerms = this.props.allActualTerms.map((item, index) => {
          return {
            id: index + 1,
            TermIterationDescription: item.TermIterationDescription,
            TermStartDate: item.TermStartDate,
            TermEndDate: item.TermEndDate,
            Year: item.Year
          };
        });

        this.setState({ tableData: allActualTerms });
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
              this.props.setupActualTermsForm();
            }}
            tableTitle="Actual Terms"
            tableHeaderObject={this.state.tableHeaders}
            tableData={this.state.tableData}
          />
        </div>
      </div>
    );
  }
}

ActualTerms.propTypes = {
  setupActualTermsForm: PropTypes.func.isRequired,
  fetchAllActualTerms: PropTypes.func.isRequired,
  allActualTerms: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allActualTerms: state.admin_home.actualTerms.allActualTerms
});

const mapDispatchToProps = dispatch => ({
  setupActualTermsForm: () => dispatch(setupActualTermsForm()),
  fetchAllActualTerms: payload => dispatch(fetchAllActualTerms(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActualTerms);
