import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./ActualLots.scss";
import {
  fetchAllActualLots,
  setupActualLotsForm,
} from "../../../../store/modules/admin_home/actions";

class ActualLots extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Lot Description",
      columnTwo: "Academic Level",
      columnFour: "Lot Registration Date"
    }
  };

  componentDidMount() {
    this.props.fetchAllActualLots();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allActualLots !== prevProps.allActualLots) {
      if (this.props.allActualLots && this.props.allActualLots.length) {
        let allActualLots = this.props.allActualLots.map((item, index) => {
          return {
            id: index + 1,
            LotDescription: item.LotDescription,
            AcademicClassLevelName: item.AcademicClassLevelName,
            RegisteredDate: item.RegisteredDate
          };
        });

        this.setState({ tableData: allActualLots });
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <Table
            addIconClicked={() => {
              this.props.setupActualLotsForm();
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

ActualLots.propTypes = {
  setupActualLotsForm: PropTypes.func.isRequired,
  fetchAllActualLots: PropTypes.func.isRequired,
  allActualLots: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allActualLots: state.admin_home.actualLots.allActualLots
});

const mapDispatchToProps = dispatch => ({
  setupActualLotsForm: () => dispatch(setupActualLotsForm()),
  fetchAllActualLots: () => dispatch(fetchAllActualLots())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActualLots);
