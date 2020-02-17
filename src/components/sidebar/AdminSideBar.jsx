import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {  withRouter } from "react-router-dom";
import { FaCogs, FaSearch } from "react-icons/fa";
import {
    REGISTER_ACADEMIC_CLASS_LEVELS, REGISTER_ACTUAL_LOTS,
    REGISTER_ACTUAL_TERMS,
    REGISTER_ACTUAL_WEEKS,
    REGISTER_CLASS_STREAMS,
    REGISTER_LOT_DESCRIPTION,
    REGISTER_TERM_ITERATIONS,
    REGISTER_WEEK_ITERATIONS
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
      samplePagesCollapsed: true,
      calenderMultiLevelDropdownCollapsed: true
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
                active: !this.state.multiLevelDropdownCollapsed
              })}
            >
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    multiLevelDropdownCollapsed: !this.state
                      .multiLevelDropdownCollapsed
                  });
                  return false;
                }}
              >
                <FaCogs />
                &nbsp;Class Configurations
                <span className="fa arrow" />
              </a>
              <ul
                className={classNames({
                  "nav nav-second-level": true,
                  collapse: this.state.multiLevelDropdownCollapsed
                })}
              >
                <li className="second-level">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleSideBarClicked(
                        REGISTER_ACADEMIC_CLASS_LEVELS
                      );
                    }}
                  >
                    Class Levels
                  </a>
                </li>

                <li className="second-level">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleSideBarClicked(REGISTER_CLASS_STREAMS);
                    }}
                  >
                    Class Streams
                  </a>
                </li>

                  <li className="second-level">
                      <a
                          href=""
                          onClick={e => {
                              e.preventDefault();
                              this.props.handleSideBarClicked(REGISTER_LOT_DESCRIPTION);
                          }}
                      >
                          Lot Description
                      </a>
                  </li>

                  <li className="second-level">
                      <a
                          href=""
                          onClick={e => {
                              e.preventDefault();
                              this.props.handleSideBarClicked(REGISTER_ACTUAL_LOTS);
                          }}
                      >
                          Actual Lots
                      </a>
                  </li>

                {/*<li*/}
                {/*  className={*/}
                {/*    classNames({*/}
                {/*      active: !this.state.thirdLevelDropdownCollapsed*/}
                {/*    }) +*/}
                {/*    " " +*/}
                {/*    "second-level"*/}
                {/*  }*/}
                {/*>*/}
                {/*  <a*/}
                {/*    href=""*/}
                {/*    onClick={e => {*/}
                {/*      e.preventDefault();*/}
                {/*      this.setState({*/}
                {/*        thirdLevelDropdownCollapsed: !this.state*/}
                {/*          .thirdLevelDropdownCollapsed*/}
                {/*      });*/}

                {/*      return false;*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    Library Partitions*/}
                {/*    <span className="fa arrow" />*/}
                {/*  </a>*/}
                {/*  <ul*/}
                {/*    className={classNames({*/}
                {/*      "nav nav-second-level": true,*/}
                {/*      collapse: this.state.thirdLevelDropdownCollapsed*/}
                {/*    })}*/}
                {/*  >*/}
                {/*    <li className="third-level">*/}
                {/*      <a*/}
                {/*        href=""*/}
                {/*        onClick={e => {*/}
                {/*          e.preventDefault();*/}

                {/*          // this.mainPartionsConfigClicked();*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        Main Partitions*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*    <li className="third-level">*/}
                {/*      <a*/}
                {/*        href=""*/}
                {/*        onClick={e => {*/}
                {/*          e.preventDefault();*/}

                {/*          // this.subPartionsConfigClicked();*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        Sub-Partitions*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*  </ul>*/}
                {/*</li>*/}

                {/*<li*/}
                {/*  className={*/}
                {/*    classNames({*/}
                {/*      active: !this.state.thirdLevelDropdownCollapsed*/}
                {/*    }) +*/}
                {/*    " " +*/}
                {/*    "second-level"*/}
                {/*  }*/}
                {/*>*/}
                {/*  <a*/}
                {/*    href=""*/}
                {/*    onClick={e => {*/}
                {/*      e.preventDefault();*/}
                {/*      this.setState({*/}
                {/*        brandDropdownCollapsed: !this.state*/}
                {/*          .brandDropdownCollapsed*/}
                {/*      });*/}

                {/*      return false;*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    Brand Configurations*/}
                {/*    <span className="fa arrow" />*/}
                {/*  </a>*/}
                {/*  <ul*/}
                {/*    className={classNames({*/}
                {/*      "nav nav-second-level": true,*/}
                {/*      collapse: this.state.brandDropdownCollapsed*/}
                {/*    })}*/}
                {/*  >*/}
                {/*    <li className="third-level">*/}
                {/*      <a*/}
                {/*        href=""*/}
                {/*        onClick={e => {*/}
                {/*          e.preventDefault();*/}

                {/*          // this.brandRegistration();*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        Brand Registration*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*  </ul>*/}
                {/*</li>*/}
              </ul>
            </li>

            <li
              className={classNames({
                active: !this.state.calenderMultiLevelDropdownCollapsed
              })}
            >
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    calenderMultiLevelDropdownCollapsed: !this.state
                      .calenderMultiLevelDropdownCollapsed
                  });
                  return false;
                }}
              >
                <FaCogs />
                &nbsp;Calender
                <span className="fa arrow" />
              </a>
              <ul
                className={classNames({
                  "nav nav-second-level": true,
                  collapse: this.state.calenderMultiLevelDropdownCollapsed
                })}
              >
                <li className="second-level">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleSideBarClicked(REGISTER_TERM_ITERATIONS);
                    }}
                  >
                    Term Iterations
                  </a>
                </li>

                <li className="second-level">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleSideBarClicked(REGISTER_WEEK_ITERATIONS);
                    }}
                  >
                    Week Iterations
                  </a>
                </li>

                <li className="second-level">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleSideBarClicked(REGISTER_ACTUAL_TERMS);
                    }}
                  >
                    Actual Terms
                  </a>
                </li>

                <li className="second-level">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleSideBarClicked(REGISTER_ACTUAL_WEEKS);
                    }}
                  >
                    Actual Weeks
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

AdminSideBar.propTypes = {
  handleSideBarClicked: PropTypes.func.isRequired
};

export default withRouter(AdminSideBar);
