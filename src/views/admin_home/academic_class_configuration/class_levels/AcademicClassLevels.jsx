import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./AcademicClassLevels.scss";
import {
  fetchAlllAcademicClassLevels,
  setupClassLevelForm
} from "../../../../store/modules/admin_home/actions";
import AdminDialog from "../../admin_dialog/AdminDialog";

class AcademicClassLevels extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Name",
      columnTwo: "Hierarchy Code"
    }
  };

  componentDidMount() {
    this.props.fetchAlllAcademicClassLevels();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.allAcademicClassLevels !== prevProps.allAcademicClassLevels
    ) {
      if (this.props.allAcademicClassLevels.length) {
        let allAcademicClassLevels = this.props.allAcademicClassLevels.map(
          (item, index) => {
            return {
              id: index + 1,
              AcademicClassLevelName: item.AcademicClassLevelName,
              HierachyCode: item.HierachyCode
            };
          }
        );

        this.setState({ tableData: allAcademicClassLevels });
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
              this.props.setupClassLevelForm();
            }}
            tableTitle="Academic Class Levels"
            tableHeaderObject={this.state.tableHeaders}
            tableData={this.state.tableData}
          />
        </div>
      </div>
    );
  }
}

AcademicClassLevels.propTypes = {
  setupClassLevelForm: PropTypes.func.isRequired,
  fetchAlllAcademicClassLevels: PropTypes.func.isRequired,
  allAcademicClassLevels: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allAcademicClassLevels: state.admin_home.allAcademicClassLevels
});

const mapDispatchToProps = dispatch => ({
  setupClassLevelForm: () => dispatch(setupClassLevelForm()),
  fetchAlllAcademicClassLevels: () => dispatch(fetchAlllAcademicClassLevels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademicClassLevels);
