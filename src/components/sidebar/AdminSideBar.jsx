import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { FaCogs, FaCog, FaSearch, FaList } from "react-icons/fa";
import {
  COMPANIES_OWNERS_RSHIP_FORM, REGISTER_ACADEMIC_CLASS_LEVELS,
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

            <li className={classNames({ active: !this.state.multiLevelDropdownCollapsed })}>
              <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      multiLevelDropdownCollapsed: !this.state.multiLevelDropdownCollapsed,
                    });
                    return false;
                  }}
              >
                <FaCogs />
                &nbsp;Class Configurations
                <span className="fa arrow" />
              </a>
              <ul
                  className={
                    classNames({
                      'nav nav-second-level': true, collapse: this.state.multiLevelDropdownCollapsed,
                    })}
              >

                <li className="second-level">
                  <a href="" onClick={(e) => { e.preventDefault(); this.props.handleSideBarClicked(REGISTER_ACADEMIC_CLASS_LEVELS);}}>Class Levels</a>
                </li>

                <li className={classNames({ active: !this.state.thirdLevelDropdownCollapsed })+" "+"second-level"}>
                  <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          thirdLevelDropdownCollapsed: !this.state.thirdLevelDropdownCollapsed,
                        });

                        return false;
                      }}
                  >
                    Library Partitions<span className="fa arrow" />
                  </a>
                  <ul
                      className={
                        classNames({
                          'nav nav-second-level': true,
                          collapse: this.state.thirdLevelDropdownCollapsed,
                        })}
                  >
                    <li className="third-level">
                      <a href="" onClick={(e) => { e.preventDefault();

                        // this.mainPartionsConfigClicked();
                      }}>Main Partitions</a>
                    </li>
                    <li className="third-level">
                      <a href="" onClick={(e) => { e.preventDefault();

                        // this.subPartionsConfigClicked();
                      }
                      }>Sub-Partitions</a>
                    </li>
                  </ul>
                </li>



                <li className={classNames({ active: !this.state.thirdLevelDropdownCollapsed })+" "+"second-level"}>
                  <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          brandDropdownCollapsed: !this.state.brandDropdownCollapsed,
                        });

                        return false;
                      }}
                  >
                    Brand Configurations<span className="fa arrow" />
                  </a>
                  <ul
                      className={
                        classNames({
                          'nav nav-second-level': true,
                          collapse: this.state.brandDropdownCollapsed,
                        })}
                  >
                    <li className="third-level">
                      <a href="" onClick={(e) => { e.preventDefault();

                        // this.brandRegistration();
                      }}>Brand Registration</a>
                    </li>

                  </ul>
                </li>
              </ul>
            </li>

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
