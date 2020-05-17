import React, { Component } from "react";
import Select from "react-select";
import "../../../../config/common/ReactDatePicker.css";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import {
  createClassFeeBreakDown,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ClassFeeStructureBreakdownForm extends Component {
  state = {
    selectedClassFeeStructureObject: "",
    classFeeStructureOptions: [],
    selectedClassFeeStructureHasError: false,
    selectedClassFeeStructureErrorMessage: "",
    termIterationOptions: [],
    selectedTermIterationObject: "",
    selectedTermIterationHasError: false,
    selectedTermIterationErrorMessage: "",
    feeAmount: "",
    feeAmountHasError: false,
    feeAmountErrorMessage: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allClassFeeStructures !== prevProps.allClassFeeStructures) {
      if (this.props.allClassFeeStructures) {
        let allClassFeeStructures = this.props.allClassFeeStructures.map(
          (item, index) => {
            return {
              label: item.AcademicClassLevelName,
              value: item.ClassFeeStructureId
            };
          }
        );
        this.setState({ classFeeStructureOptions: allClassFeeStructures });
      }
    }

    if (this.props.allTermIterations !== prevProps.allTermIterations) {
      if (this.props.allTermIterations) {
        let termIterations = this.props.allTermIterations.map((item, index) => {
          return {
            label: item.TermIterationDescription,
            value: item.TermIterationId
          };
        });
        this.setState({ termIterationOptions: termIterations });
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

    if (!this.state.selectedClassFeeStructureObject) {
      this.setState({
        selectedClassFeeStructureHasError: true,
        selectedClassFeeStructureErrorMessage: "This field is required"
      });
    } else if (!this.state.selectedTermIterationObject) {
      this.setState({
        selectedTermIterationHasError: true,
        selectedTermIterationErrorMessage: "This field is required"
      });
    } else {
      const payload = {
        ClassFeeStructureId: this.state.selectedClassFeeStructureObject.value,
        TermIterationId: this.state.selectedTermIterationObject.value,
        FeeAmount: this.state.feeAmount
      };

      this.props.createClassFeeBreakDown(payload);
      this.props.toggleAdminModalDisplay();
    }
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Class Fee Breakdown</h3>
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
                          this.state.selectedClassFeeStructureHasError
                            ? "react-select personal__text-area-error"
                            : "react-select"
                        }
                        classNamePrefix="react-select"
                        placeholder="Class"
                        name="selectedClassFeeStructureObject"
                        closeMenuOnSelect={true}
                        value={this.state.selectedClassFeeStructureObject}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            selectedClassFeeStructureObject: value
                          })
                        }
                        options={this.state.classFeeStructureOptions}
                      />
                      <p
                        className={
                          this.state.selectedClassFeeStructureHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.selectedClassFeeStructureErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>

                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <Select
                        className={
                          this.state.selectedFeeComponentHasError
                            ? "react-select personal__text-area-error"
                            : "react-select"
                        }
                        classNamePrefix="react-select"
                        placeholder="Term"
                        name="selectedTermIterationObject"
                        closeMenuOnSelect={true}
                        value={this.state.selectedTermIterationObject}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            selectedTermIterationObject: value
                          })
                        }
                        options={this.state.termIterationOptions}
                      />
                      <p
                        className={
                          this.state.selectedFeeComponentHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.selectedTermIterationErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                </Columns>

                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <input
                        name="feeAmount"
                        className={
                          this.state.feeAmountHasError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Fee Amount"
                        value={this.state.feeAmount}
                        type="number"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.feeAmountHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.feeAmountErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                  <Columns.Column size="one-half" />
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

ClassFeeStructureBreakdownForm.propTypes = {
  createClassFeeBreakDown: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  allClassFeeStructures: PropTypes.arrayOf(PropTypes.object).isRequired,
  allTermIterations: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  isCurrentActualTermCreated:
    state.admin_home.actualTerms.isCurrentActualTermCreated,
  allTermIterations: state.admin_home.termIterations.allTermIterations,
  allClassFeeStructures:
    state.admin_home.classFeeStructure.allClassFeeStructures
});

const mapDispatchToProps = dispatch => ({
  createClassFeeBreakDown: payload =>
    dispatch(createClassFeeBreakDown(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassFeeStructureBreakdownForm);
