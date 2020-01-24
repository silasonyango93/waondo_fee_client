import React, { Component } from "react";
import ReactDatetime from "react-datetime";
import YearPicker from "react-year-picker";
import Select from "react-select";
import "../../../../config/common/ReactDatePicker.css";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import "./ActualWeeks.scss";
import {
  createActualTerm,
  createActualWeek,
  fetchAllActualTerms,
  fetchAllTermIterations,
  fetchAyearsActualWeeks,
  resetCurrentActualTermCreated,
  resetCurrentActualWeekCreated,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ActualWeeksForm extends Component {
  state = {
    selectedTermObject: "",
    terms: [],
    selectedTermHasError: false,
    selectedTermErrorMessage: "",
    selectedWeekIterationObject: "",
    weekIterations: [],
    selectedWeekIterationHasError: false,
    selectedWeekIterationErrorMessage: "",
    weekStartDate: "",
    weekStartDateHasError: false,
    weekStartDateErrorMessage: "",
    weekEndDate: "",
    weekEndDateHasError: false,
    weekEndDateErrorMessage: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isCurrentActualWeekCreated !==
      prevProps.isCurrentActualWeekCreated
    ) {
      if (this.props.isCurrentActualWeekCreated) {
        const payload = {
          year: new Date().getFullYear()
        };
        this.props.fetchAyearsActualWeeks(payload);
        this.props.resetCurrentActualWeekCreated();
      }
    }

    if (this.props.allActualTerms !== prevProps.allActualTerms) {
      if (this.props.allActualTerms) {
        let allActualTerms = this.props.allActualTerms.map((item, index) => {
          return {
            label: item.TermIterationDescription,
            value: item.TermId
          };
        });
        this.setState({ terms: allActualTerms });
      }
    }

    if (this.props.allWeekIterations !== prevProps.allWeekIterations) {
      if (this.props.allWeekIterations) {
        let allWeekIterations = this.props.allWeekIterations.map(
          (item, index) => {
            return {
              label: item.WeekIterationDescription,
              value: item.WeekIterationId
            };
          }
        );
        this.setState({ weekIterations: allWeekIterations });
      }
    }
  }

  handleChange = event => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState({
      ...newState
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let weekStartDate =
      this.state.weekStartDate._d.getFullYear() +
      "-" +
      (this.state.weekStartDate._d.getMonth() + 1) +
      "-" +
      this.state.weekStartDate._d.getDate();

    let weekEndDate =
      this.state.weekEndDate._d.getFullYear() +
      "-" +
      (this.state.weekEndDate._d.getMonth() + 1) +
      "-" +
      this.state.weekEndDate._d.getDate();
    const payload = {
      TermId: this.state.selectedTermObject.value,
      WeekIterationId: this.state.selectedWeekIterationObject.value,
      WeekStartDate: weekStartDate,
      WeekEndDate: weekEndDate
    };

    this.props.createActualWeek(payload);
    this.props.toggleAdminModalDisplay(false);
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Actual Week Registration</h3>
          </div>
          <div className="panel-body">
            <form
              action=""
              method="POST"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
            >
              <fieldset>
                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <Select
                        className={
                          this.state.selectedTermHasError
                            ? "react-select personal__text-area-error"
                            : "react-select"
                        }
                        classNamePrefix="react-select"
                        placeholder="Term Iteration"
                        name="selectedTermObject"
                        closeMenuOnSelect={true}
                        value={this.state.selectedTermObject}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            selectedTermObject: value
                          })
                        }
                        options={this.state.terms}
                      />
                      <p
                        className={
                          this.state.selectedTermHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.selectedTermErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>

                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <Select
                        className={
                          this.state.selectedWeekIterationHasError
                            ? "react-select personal__text-area-error"
                            : "react-select"
                        }
                        classNamePrefix="react-select"
                        placeholder="Term Iteration"
                        name="selectedTermIterationObject"
                        closeMenuOnSelect={true}
                        value={this.state.selectedWeekIterationObject}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            selectedWeekIterationObject: value
                          })
                        }
                        options={this.state.weekIterations}
                      />
                      <p
                        className={
                          this.state.selectedWeekIterationHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.selectedWeekIterationErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                </Columns>

                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <ReactDatetime
                        name="weekStartDate"
                        value={this.state.weekStartDate}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            weekStartDate: value
                          })
                        }
                        inputProps={{
                          className: "form-control",
                          placeholder: "Week Start Date"
                        }}
                        timeFormat={false}
                      />
                      <p
                        className={
                          this.state.weekStartDateHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.weekStartDateErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>

                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <ReactDatetime
                        name="weekEndDate"
                        value={this.state.weekEndDate}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            weekEndDate: value
                          })
                        }
                        inputProps={{
                          className: "form-control",
                          placeholder: "Week End Date"
                        }}
                        timeFormat={false}
                      />
                      <p
                        className={
                          this.state.weekEndDateHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.weekEndDateErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                </Columns>

                <button
                  type="submit"
                  className="btn btn-lg btn-success btn-block"
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ActualWeeksForm.propTypes = {
  createActualWeek: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  fetchAyearsActualWeeks: PropTypes.func.isRequired,
  isCurrentActualWeekCreated: PropTypes.bool.isRequired,
  resetCurrentActualWeekCreated: PropTypes.func.isRequired,
  allActualTerms: PropTypes.arrayOf(PropTypes.object).isRequired,
  allWeekIterations: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllTermIterations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isCurrentActualWeekCreated:
    state.admin_home.actualWeeks.isCurrentActualWeekCreated,
  allActualTerms: state.admin_home.actualTerms.allActualTerms,
  allWeekIterations: state.admin_home.weekIterations.allWeekIterations
});

const mapDispatchToProps = dispatch => ({
  createActualWeek: payload => dispatch(createActualWeek(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
  fetchAyearsActualWeeks: payload => dispatch(fetchAyearsActualWeeks(payload)),
  resetCurrentActualWeekCreated: () =>
    dispatch(resetCurrentActualWeekCreated()),
  fetchAllTermIterations: () => dispatch(fetchAllTermIterations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActualWeeksForm);
