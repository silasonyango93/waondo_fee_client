import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../../components/table/table_body/Table";
import "./AcademicClassLevels.scss";
import {
  setupClassLevelForm,
  toggleAdminModalDisplay
} from "../../../store/modules/admin_home/actions";
import AdminDialog from "../admin_dialog/AdminDialog";

class AcademicClassLevels extends Component {
  render() {
    return (
      <div>
        <AdminDialog />
        <div className="level__table-div">
          <Table
            addIconClicked={() => {
              this.props.setupClassLevelForm();
            }}
          />
        </div>
      </div>
    );
  }
}

AcademicClassLevels.propTypes = {
  setupClassLevelForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setupClassLevelForm: () => dispatch(setupClassLevelForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademicClassLevels);
