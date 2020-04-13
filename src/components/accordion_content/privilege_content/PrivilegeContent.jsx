import React, { Component } from "react";
import PropTypes from "prop-types";

import "./PrivilegeContent.scss";
import CheckBoxGroup from "../../check_box_group/CheckBoxGroup";
import { connect } from "react-redux";
import { updateAUserRole } from "../../../store/modules/current_session/actions";

class PrivilegeContent extends Component {
  state = {
    roleData: [],
    adminAccessPrivileges: [],
    userAccessPrivileges: []
  };

  componentDidMount() {
    if (this.props.userRoles && this.props.userRoles.length) {
      let checkBoxRoles = this.props.userRoles;
      let adminAccessPrivileges = [];
      let userAccessPrivileges = [];

      checkBoxRoles.forEach(element => {
        element.label = element.roleDescription;
        element.isCheckBoxChecked = element.confirmationStatus === 1;
      });

      checkBoxRoles.forEach(element => {
        if (element.roleDescription === "Admin") {
          adminAccessPrivileges = element.userAccessPrivilegesDtoList;
        } else {
          userAccessPrivileges = element.userAccessPrivilegesDtoList;
        }
      });

      if (adminAccessPrivileges.length) {
        adminAccessPrivileges.forEach(element => {
          element.label = element.accessPrivilegeDescription;
          element.isCheckBoxChecked = element.permissionStatus === 1;
        });
      }

      if (userAccessPrivileges.length) {
        userAccessPrivileges.forEach(element => {
          element.label = element.accessPrivilegeDescription;
          element.isCheckBoxChecked = element.permissionStatus === 1;
        });
      }

      this.setState({
        roleData: checkBoxRoles,
        adminAccessPrivileges,
        userAccessPrivileges
      });
    }
  }

  handleAnyRolesCheckBoxIsChecked = checkBoxObject => {
    const payload = {
      ColumnName: "UserRoleId",
      ColumnValue: checkBoxObject.userRoleId,
      ConfirmationStatus: "1"
    };

    this.props.updateAUserRole(payload);
  };

  handleAnyRolesCheckBoxIsUnChecked = checkBoxObject => {
    const payload = {
      ColumnName: "UserRoleId",
      ColumnValue: checkBoxObject.userRoleId,
      ConfirmationStatus: "0"
    };

    this.props.updateAUserRole(payload);
  };

  render() {
    const {
      roleData,
      userAccessPrivileges,
      adminAccessPrivileges
    } = this.state;

    return (
      <div className="privilege__main-body">
        <CheckBoxGroup
          title="User Roles"
          checkBoxObjectsArray={roleData}
          handleCheckBoxIsChecked={this.handleAnyRolesCheckBoxIsChecked}
          handleCheckBoxIsUnchecked={this.handleAnyRolesCheckBoxIsUnChecked}
        />
        <CheckBoxGroup
          title="Admin Privileges"
          checkBoxObjectsArray={adminAccessPrivileges}
        />
        <CheckBoxGroup
          title="Staff Privileges"
          checkBoxObjectsArray={userAccessPrivileges}
        />
      </div>
    );
  }
}

PrivilegeContent.propTypes = {
  userRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateAUserRole: PropTypes.func
};

PrivilegeContent.defaultProps = {
  updateAUserRole: () => {}
};

const mapDispatchToProps = dispatch => ({
  updateAUserRole: payload => dispatch(updateAUserRole(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(PrivilegeContent);
