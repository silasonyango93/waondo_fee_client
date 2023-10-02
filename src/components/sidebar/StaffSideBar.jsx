import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {FaCogs, FaSearch} from "react-icons/fa";
import {
    CHANGE_STUDENT_RESIDENCE,
    CORRECT_STUDENT_PERSONAL_DETAILS,
    PAY_FEE,
    REGISTER_A_STUDENT_PAGE,
    SEND_HOME_FROM_ENTIRE_SCHOOL,
    SEND_HOME_PER_CLASS, SEND_HOME_PER_LOT
} from "../../views/staff_home/StaffHomeConstants";

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
            userManagementMultiLevelDropdownCollapsed: true,
            feeManagementMultiLevelDropdownCollapsed: true,
            studentsHomeMultiLevelDropdownCollapsed: true,
            correctionMultiLevelDropdownCollapsed: true,
            residenceMultiLevelDropdownCollapsed: true
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
                    <FaSearch/>
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
                                <FaCogs/>
                                &nbsp;Student Management
                                <span className="fa arrow"/>
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


                        <li
                            className={classNames({
                                active: !this.state.feeManagementMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        feeManagementMultiLevelDropdownCollapsed: !this.state
                                            .feeManagementMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaCogs/>
                                &nbsp;Fee Management
                                <span className="fa arrow"/>
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.feeManagementMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(PAY_FEE);
                                        }}
                                    >
                                        Pay Fee
                                    </a>
                                </li>

                            </ul>
                        </li>


                        <li
                            className={classNames({
                                active: !this.state.studentsHomeMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        studentsHomeMultiLevelDropdownCollapsed: !this.state
                                            .studentsHomeMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaCogs/>
                                &nbsp;Send Students Home
                                <span className="fa arrow"/>
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.studentsHomeMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(SEND_HOME_PER_CLASS);
                                        }}
                                    >
                                        Per stream
                                    </a>
                                </li>

                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(SEND_HOME_PER_LOT);
                                        }}
                                    >
                                        Per class
                                    </a>
                                </li>

                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(SEND_HOME_FROM_ENTIRE_SCHOOL);
                                        }}
                                    >
                                        The whole school
                                    </a>
                                </li>

                            </ul>
                        </li>


                        <li
                            className={classNames({
                                active: !this.state.correctionMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        correctionMultiLevelDropdownCollapsed: !this.state
                                            .correctionMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaCogs/>
                                &nbsp;Corrections
                                <span className="fa arrow"/>
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.correctionMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(CORRECT_STUDENT_PERSONAL_DETAILS);
                                        }}
                                    >
                                        Student Personal Details
                                    </a>
                                </li>

                            </ul>
                        </li>


                        <li
                            className={classNames({
                                active: !this.state.residenceMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        residenceMultiLevelDropdownCollapsed: !this.state
                                            .residenceMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaCogs/>
                                &nbsp;Residence Management
                                <span className="fa arrow"/>
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.residenceMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(CHANGE_STUDENT_RESIDENCE);
                                        }}
                                    >
                                        Change Student Residence
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
