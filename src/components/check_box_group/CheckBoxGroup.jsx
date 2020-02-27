import React, { Component } from "react";
import PropTypes from "prop-types";

import CheckBox from "../check_box/CheckBox";
import "./CheckBoxGroup.scss";

import "./CheckBoxGroup.scss";

class CheckBoxGroup extends Component {
  state = {
    checkBoxGroupJsx: []
  };

  componentDidMount() {
    const {
      checkBoxObjectsArray,
      handleCheckBoxIsChecked,
      handleCheckBoxIsUnchecked
    } = this.props;

    if (checkBoxObjectsArray && checkBoxObjectsArray.length) {
      let checkBoxGroupJsx = [];

      checkBoxObjectsArray.forEach(element => {
        checkBoxGroupJsx.push(
          <CheckBox
            label={element.label}
            checkBoxObject={element}
            handleCheckBoxIsChecked={handleCheckBoxIsChecked}
            handleCheckBoxIsUnchecked={handleCheckBoxIsUnchecked}
            isCheckBoxChecked={element.isCheckBoxChecked}
          />
        );
      });

      this.setState({ checkBoxGroupJsx });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      checkBoxObjectsArray,
      handleCheckBoxIsChecked,
      handleCheckBoxIsUnchecked
    } = this.props;

    if (checkBoxObjectsArray !== prevProps.checkBoxObjectsArray) {
      if (checkBoxObjectsArray && checkBoxObjectsArray.length) {
        let checkBoxGroupJsx = [];

        checkBoxObjectsArray.forEach(element => {
          checkBoxGroupJsx.push(
            <CheckBox
              label={element.label}
              checkBoxObject={element}
              handleCheckBoxIsChecked={handleCheckBoxIsChecked}
              handleCheckBoxIsUnchecked={handleCheckBoxIsUnchecked}
              isCheckBoxChecked={element.isCheckBoxChecked}
            />
          );
        });

        this.setState({ checkBoxGroupJsx });
      }
    }
  }

  render() {
    const { title } = this.props;

    return (
      <div className="group__role-div">
        <div className="group__role-title">{title}</div>
        <div className="group__checkbox-div">{this.state.checkBoxGroupJsx}</div>
      </div>
    );
  }
}

CheckBoxGroup.propTypes = {
  title: PropTypes.string,
  checkBoxObjectsArray: PropTypes.arrayOf(PropTypes.object),
  handleCheckBoxIsChecked: PropTypes.func,
  handleCheckBoxIsUnchecked: PropTypes.func
};

CheckBoxGroup.defaultProps = {
  title: "Staff Access Privileges",
  checkBoxObjectsArray: [
    {
      UserRoleId: "3",
      RoleDescription: "System Admin",
      label: "System Admin",
      isCheckBoxChecked: true
    },
    {
      UserRoleId: "4",
      RoleDescription: "System Admin",
      label: "System Admin",
      isCheckBoxChecked: false
    },
    {
      UserRoleId: "5",
      RoleDescription: "System Admin",
      label: "System Admin",
      isCheckBoxChecked: true
    },
    {
      UserRoleId: "6",
      RoleDescription: "System Admin",
      label: "System Admin",
      isCheckBoxChecked: false
    },
    {
      UserRoleId: "7",
      RoleDescription: "System Admin",
      label: "System Admin",
      isCheckBoxChecked: true
    }
  ],
  handleCheckBoxIsChecked: () => {},
  handleCheckBoxIsUnchecked: () => {}
};

export default CheckBoxGroup;
