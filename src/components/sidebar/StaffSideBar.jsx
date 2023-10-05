import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {FaCogs, FaSearch, FaUserPlus, FaRegPaperPlane, FaBuilding, FaVolumeUp, FaDownload} from "react-icons/fa";
import {
    CHANGE_STUDENT_RESIDENCE,
    CORRECT_STUDENT_PERSONAL_DETAILS,
    ENTIRE_SCHOOL_ANNOUNCEMENT,
    PAY_FEE,
    PAYMENTS_MADE_ON_SPECIFIC_DATE,
    PAYMENTS_MADE_TODAY,
    PAYMENTS_MADE_WITHIN_A_DATE_RANGE,
    REGISTER_A_STUDENT_PAGE,
    SEND_HOME_FROM_ENTIRE_SCHOOL,
    SEND_HOME_PER_CLASS,
    SEND_HOME_PER_LOT,
    SPECIFIC_CLASS_ANNOUNCEMENT,
    SPECIFIC_STREAM_ANNOUNCEMENT
} from "../../views/staff_home/StaffHomeConstants";
import {GiAutoRepair, GiTakeMyMoney} from "react-icons/all";

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
            residenceMultiLevelDropdownCollapsed: true,
            announcementMultiLevelDropdownCollapsed: true,
            downloadsMultiLevelDropdownCollapsed: true
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
                                <FaUserPlus/>
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
                                <GiTakeMyMoney/>
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
                                <FaRegPaperPlane/>
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
                                <GiAutoRepair/>
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
                                <FaBuilding/>
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


                        <li
                            className={classNames({
                                active: !this.state.announcementMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        announcementMultiLevelDropdownCollapsed: !this.state
                                            .announcementMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaVolumeUp/>
                                &nbsp;Announcements
                                <span className="fa arrow"/>
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.announcementMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(ENTIRE_SCHOOL_ANNOUNCEMENT);
                                        }}
                                    >
                                        Entire School
                                    </a>
                                </li>

                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(SPECIFIC_CLASS_ANNOUNCEMENT);
                                        }}
                                    >
                                        Specific Form
                                    </a>
                                </li>

                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(SPECIFIC_STREAM_ANNOUNCEMENT);
                                        }}
                                    >
                                        Specific Stream
                                    </a>
                                </li>

                            </ul>
                        </li>


                        <li
                            className={classNames({
                                active: !this.state.downloadsMultiLevelDropdownCollapsed
                            })}
                        >
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        downloadsMultiLevelDropdownCollapsed: !this.state
                                            .downloadsMultiLevelDropdownCollapsed
                                    });
                                    return false;
                                }}
                            >
                                <FaDownload/>
                                &nbsp;Downloads
                                <span className="fa arrow"/>
                            </a>
                            <ul
                                className={classNames({
                                    "nav nav-second-level": true,
                                    collapse: this.state.downloadsMultiLevelDropdownCollapsed
                                })}
                            >
                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(PAYMENTS_MADE_TODAY);
                                        }}
                                    >
                                        Today's Fee Payments
                                    </a>
                                </li>

                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(PAYMENTS_MADE_ON_SPECIFIC_DATE);
                                        }}
                                    >
                                        Payments On Specific Date
                                    </a>
                                </li>

                                <li className="second-level">
                                    <a
                                        href=""
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.handleSideBarClicked(PAYMENTS_MADE_WITHIN_A_DATE_RANGE);
                                        }}
                                    >
                                        Payments Within Date Range
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
