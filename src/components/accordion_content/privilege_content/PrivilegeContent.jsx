import React, { Component } from "react";
import PropTypes from "prop-types";

import "./PrivilegeContent.scss";
import CheckBoxGroup from "../../check_box_group/CheckBoxGroup";

class PrivilegeContent extends Component {
    state = {
        roleData: [],
        adminAccessPrivileges: [],
        userAccessPrivileges: []
    };

    componentDidMount() {
        if(this.props.userRoles && this.props.userRoles.length) {
            let checkBoxRoles = this.props.userRoles;
            let adminAccessPrivileges = [];
            let userAccessPrivileges = [];

            checkBoxRoles.forEach(element => {
                element.label = element.roleDescription;
                element.isCheckBoxChecked = element.confirmationStatus === 1;
            });


            checkBoxRoles.forEach(element => {
                if(element.roleDescription === 'Admin') {
                    adminAccessPrivileges = element.userAccessPrivileges;
                } else {
                    userAccessPrivileges = element.userAccessPrivileges;
                }
            });

            if(adminAccessPrivileges.length) {
                adminAccessPrivileges.forEach(element => {
                    element.label = element.AccessPrivilegeDescription;
                    element.isCheckBoxChecked = element.PermisionStatus === 1;
                });
            }


            if(userAccessPrivileges.length) {
                userAccessPrivileges.forEach(element => {
                    element.label = element.AccessPrivilegeDescription;
                    element.isCheckBoxChecked = element.PermisionStatus === 1;
                });
            }

            this.setState({roleData: checkBoxRoles, adminAccessPrivileges , userAccessPrivileges});

        }
    }



    render() {

        const {
            roleData,
            userAccessPrivileges,
            adminAccessPrivileges
        } = this.state;

    return (
      <div className="privilege__main-body">
        <CheckBoxGroup title="User Roles" checkBoxObjectsArray={roleData}/>
          <CheckBoxGroup title="Admin Privileges" checkBoxObjectsArray={adminAccessPrivileges}/>
          <CheckBoxGroup title="Staff Privileges" checkBoxObjectsArray={userAccessPrivileges}/>
      </div>
    );
  }
}

PrivilegeContent.propTypes = {
    userRoles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PrivilegeContent;
