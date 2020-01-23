import React, { Component } from "react";
import ReactDatetime from "react-datetime";
import YearPicker from "react-year-picker";
import Select from "react-select";
import '../../../../config/common/ReactDatePicker.css';
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import './ActualTerms.scss';
import {
    createActualTerm,
    createWeekIterations, fetchAllActualTerms, fetchAllTermIterations,
    fetchAllWeekIterations, resetCurrentActualTermCreated,
    resetCurrentWeekIterationCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ActualTermsForm extends Component {
  state = {
    selectedTermIterationObject: "",
    termIterations: [],
      selectedTermIterationHasError: false,
      selectedTermIterationErrorMessage: "",
    termStartDate: "",
      termStartDateHasError: false,
      termStartDateErrorMessage: "",
      termEndDate: "",
      termEndDateHasError: false,
      termEndDateErrorMessage: "",
      year: "",
      yearHasError: false,
      yearErrorMessage: ""
  };


    componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isCurrentActualTermCreated !==
      prevProps.isCurrentActualTermCreated
    ) {
      if (this.props.isCurrentActualTermCreated) {
          const payload = {
              TableOne: "term_iterations",
              JoiningKey: "TermIterationId",
              SearchColumn: "Year",
              SearchValue: new Date().getFullYear()
          };
        this.props.fetchAllActualTerms(payload);
        this.props.resetCurrentActualTermCreated();
      }
    }

    if(this.props.allTermIterations !== prevProps.allTermIterations) {
        if(this.props.allTermIterations) {
            let termIterations = this.props.allTermIterations.map((item, index) => {
                return {
                    label: item.TermIterationDescription,
                    value: item.TermIterationId
                };
            });
            this.setState({termIterations: termIterations});
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

  handleYearChange = (year) => {
      this.setState({year});
  };

  handleSubmit = e => {
    e.preventDefault();

    if(!isNaN(this.state.year)) {
        let termStartDate =
            this.state.termStartDate._d.getFullYear() +
            "-" +
            (this.state.termStartDate._d.getMonth() + 1) +
            "-" +
            this.state.termStartDate._d.getDate();

        let termEndDate =
            this.state.termEndDate._d.getFullYear() +
            "-" +
            (this.state.termEndDate._d.getMonth() + 1) +
            "-" +
            this.state.termEndDate._d.getDate();
        const payload = {
            TermIterationId: this.state.selectedTermIterationObject.value,
            TermStartDate: termStartDate,
            TermEndDate: termEndDate,
            Year: this.state.year
        };

        this.props.createActualTerm(payload);
        this.props.toggleAdminModalDisplay(false);
    }

  };

  render() {
    return (
        <div>
            <div className="login-panel panel panel-default dialog__main-body">
                <div className="panel-heading">
                    <h3 className="panel-title">Actual Term Registration</h3>
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
                                                this.state.selectedTermIterationHasError
                                                    ? "react-select personal__text-area-error"
                                                    : "react-select"
                                            }
                                            classNamePrefix="react-select"
                                            placeholder="Term Iteration"
                                            name="selectedTermIterationObject"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedTermIterationObject}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedTermIterationObject: value
                                                })
                                            }
                                            options={this.state.termIterations}
                                        />
                                        <p
                                            className={
                                                this.state.selectedTermIterationHasError
                                                    ? "personal__submision-error"
                                                    : "personal__hide"
                                            }
                                        >
                                            {this.state.selectedTermIterationErrorMessage}
                                        </p>
                                    </div>
                                </Columns.Column>

                                <Columns.Column size="one-half">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <ReactDatetime
                                                name="termStartDate"
                                                value={this.state.termStartDate}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        termStartDate: value
                                                    })
                                                }
                                                inputProps={{
                                                    className: "form-control",
                                                    placeholder: "Term Start Date"
                                                }}
                                                timeFormat={false}
                                            />
                                            <p
                                                className={
                                                    this.state.termStartDateHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.termStartDateErrorMessage}
                                            </p>
                                        </div>
                                    </div>
                                </Columns.Column>
                            </Columns>

                            <Columns>
                                <Columns.Column size="one-half">
                                    <div className="form-group">
                                        <ReactDatetime
                                            name="termEndDate"
                                            value={this.state.termEndDate}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    termEndDate: value
                                                })
                                            }
                                            inputProps={{
                                                className: "form-control",
                                                placeholder: "Term End Date"
                                            }}
                                            timeFormat={false}
                                        />
                                        <p
                                            className={
                                                this.state.termEndDateHasError
                                                    ? "personal__submision-error"
                                                    : "personal__hide"
                                            }
                                        >
                                            {this.state.termEndDateErrorMessage}
                                        </p>
                                    </div>
                                </Columns.Column>

                                <Columns.Column size="one-half">
                                    <div className="form-group">
                                        <YearPicker onChange={this.handleYearChange} />
                                        <p
                                            className={
                                                this.state.yearHasError
                                                    ? "personal__submision-error"
                                                    : "personal__hide"
                                            }
                                        >
                                            {this.state.yearErrorMessage}
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

ActualTermsForm.propTypes = {
    createActualTerm: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllActualTerms: PropTypes.func.isRequired,
    isCurrentActualTermCreated: PropTypes.bool.isRequired,
    resetCurrentActualTermCreated: PropTypes.func.isRequired,
    allTermIterations: PropTypes.arrayOf(PropTypes.object)
        .isRequired,
    fetchAllTermIterations: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isCurrentActualTermCreated:
    state.admin_home.actualTerms.isCurrentActualTermCreated,
    allTermIterations:
    state.admin_home.termIterations.allTermIterations
});

const mapDispatchToProps = dispatch => ({
    createActualTerm: payload => dispatch(createActualTerm(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
    fetchAllActualTerms: payload => dispatch(fetchAllActualTerms(payload)),
    resetCurrentActualTermCreated: () =>
    dispatch(resetCurrentActualTermCreated()),
    fetchAllTermIterations: () =>
        dispatch(fetchAllTermIterations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActualTermsForm);
