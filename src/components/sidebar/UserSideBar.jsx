import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { FaCogs, FaCog, FaSearch, FaList } from "react-icons/fa";
import {DATA_ENTRY_FORM} from "../../views/user_home/UserHomeConstants";

class UserSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uiElementsCollapsed: true,
            chartsElementsCollapsed: true,
            multiLevelDropdownCollapsed: true,
            thirdLevelDropdownCollapsed: true,
            brandDropdownCollapsed: true,
            samplePagesCollapsed: true
        };


    }



    render() {
        return (
            <div
                className="navbar-default sidebar"
                role="navigation"
            >
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

                        <li className="list-class">
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.handleSideBarClicked(
                                        DATA_ENTRY_FORM
                                    );
                                }}
                            >
                                <i className="fa fa-dashboard fa-fw" /> &nbsp;Data Entry
                            </a>
                        </li>


                    </ul>
                </div>
            </div>
        );
    }
}

UserSideBar.propTypes = {
    handleSideBarClicked: PropTypes.func.isRequired
};

export default withRouter(UserSideBar);
