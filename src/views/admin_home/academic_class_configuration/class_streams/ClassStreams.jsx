import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../../components/table/table_body/Table";
import "./ClassStreams.scss";
import {
    fetchAllClassStreams,
    fetchAlllAcademicClassLevels,
    setupClassLevelForm,
    setupClassStreamForm
} from "../../../../store/modules/admin_home/actions";
import AdminDialog from "../../admin_dialog/AdminDialog";

class ClassStreams extends Component {
  state = {
    tableData: [],
    tableHeaders: {
      columnZero: "#",
      columnOne: "Name"
    }
  };

  componentDidMount() {
    this.props.fetchAllClassStreams();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allClassStreams !== prevProps.allClassStreams) {
      if (this.props.allClassStreams && this.props.allClassStreams.length) {
        let allClassStreams = this.props.allClassStreams.map((item, index) => {
          return {
            id: index + 1,
            ClassStreamName: item.ClassStreamName
          };
        });

        this.setState({ tableData: allClassStreams });
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
              this.props.setupClassStreamForm();
            }}
            tableTitle="Class Streams"
            tableHeaderObject={this.state.tableHeaders}
            tableData={this.state.tableData}
          />
        </div>
      </div>
    );
  }
}

ClassStreams.propTypes = {
  setupClassStreamForm: PropTypes.func.isRequired,
    fetchAllClassStreams: PropTypes.func.isRequired,
  allClassStreams: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allClassStreams: state.admin_home.classStreams.allClassStreams
});

const mapDispatchToProps = dispatch => ({
  setupClassStreamForm: () => dispatch(setupClassStreamForm()),
    fetchAllClassStreams: () => dispatch(fetchAllClassStreams())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassStreams);
