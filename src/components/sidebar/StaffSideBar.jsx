import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {  withRouter } from "react-router-dom";
import { FaCogs, FaSearch } from "react-icons/fa";
import {REGISTER_A_STUDENT_PAGE} from "../../views/staff_home/StaffHomeConstants";

class StaffSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uiElementsCollapsed: true,
            chartsElementsCollapsed: true,
            multiLevelDropdownCollapsed: true,
            thirdLevelDropdownCollapsed: true,
            brandDropdownCollapsed: true,
            samplePagesCollapsed: true,
            userManagementMultiLevelDropdownCollapsed: true
        };
    }

    render() {
        return (
            <div className="navbar-default sidebar" role="navigation">
                <button
                    className="navbar-toggle"
                    type="button"
                    data-toggle="colapse"
                    data-target=".navbar-colapse"
                />
                <div className="sidebar-nav navbar-collapse collapse">
                    <ul className="nav in" id="side-menu">
                        <li>
                            <div className="input-group custom-search-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                />
                                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <FaSearch />
                  </button>
                </span>
                            </div>
                        </li>





                        <li
                            className={classNames({
                                active: !this.state.userManagementMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        userManagementMultiLevelDropdownCollapsed: !this.state
                                            .userManagementMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaCogs />
                                &nbsp;User Management
                                <span className="fa arrow" />
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.userManagementMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(REGISTER_A_STUDENT_PAGE);
                                        }}
                                    >
                                        Student Registration
                                    </a>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        );
    }
}

StaffSideBar.propTypes = {
    handleSideBarClicked: PropTypes.func.isRequired
};

export default withRouter(StaffSideBar);
