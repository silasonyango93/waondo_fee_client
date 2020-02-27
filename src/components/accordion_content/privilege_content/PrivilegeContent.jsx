import React, { Component } from "react";

import "./PrivilegeContent.scss";
import CheckBoxGroup from "../../check_box_group/CheckBoxGroup";

class PrivilegeContent extends Component {
  render() {
    return (
      <div className="privilege__main-body">
        <CheckBoxGroup title="User Roles" />

        <CheckBoxGroup />
        <CheckBoxGroup />
      </div>
    );
  }
}

export default PrivilegeContent;
