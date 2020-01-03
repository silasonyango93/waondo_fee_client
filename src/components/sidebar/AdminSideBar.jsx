import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { FaCogs, FaCog, FaSearch, FaList } from "react-icons/fa";
import {
  COMPANIES_OWNERS_RSHIP_FORM,
  REGISTER_COMPANIES_FORM,
  REGISTER_COMPANIES_OWNERS_FORM
} from "../../views/admin_home/AdminHomeConstants";

class AdminSideBar extends Component {
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

    this.mainPartionsConfigClicked = this.mainPartionsConfigClicked.bind(this);
    this.subPartionsConfigClicked = this.subPartionsConfigClicked.bind(this);
    this.libraryFieldsConfigClicked = this.libraryFieldsConfigClicked.bind(
      this
    );
    this.brandRegistration = this.brandRegistration.bind(this);
  }

  mainPartionsConfigClicked() {
    this.props.history.push("/main-partitions-config");
  }

  subPartionsConfigClicked() {
    this.props.history.push("/subpartitions-config");
  }

  libraryFieldsConfigClicked() {
    this.props.history.push("/fields-config");
  }

  brandRegistration() {
    this.props.history.push("/brand-registration");
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

            <li className="list-class">
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.props.handleSideBarClicked(REGISTER_COMPANIES_FORM);
                }}
              >
                <i className="fa fa-dashboard fa-fw" /> &nbsp;Companies
              </a>
            </li>

            <li className="list-class">
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.props.handleSideBarClicked(
                    REGISTER_COMPANIES_OWNERS_FORM
                  );
                }}
              >
                <i className="fa fa-dashboard fa-fw" /> &nbsp;Company Owners
              </a>
            </li>

            {/*<li className="list-class">*/}
            {/*  <a*/}
            {/*    href=""*/}
            {/*    onClick={e => {*/}
            {/*      e.preventDefault();*/}
            {/*      this.props.handleSideBarClicked(COMPANIES_OWNERS_RSHIP_FORM);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <i className="fa fa-dashboard fa-fw" /> &nbsp;Assign Company*/}
            {/*    Owners*/}
            {/*  </a>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
    );
  }
}

AdminSideBar.propTypes = {
  handleSideBarClicked: PropTypes.func.isRequired
};

export default withRouter(AdminSideBar);
