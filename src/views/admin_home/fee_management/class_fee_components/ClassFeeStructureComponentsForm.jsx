import React, { Component } from "react";
import Select from "react-select";
import "../../../../config/common/ReactDatePicker.css";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import {
  createClassFeeComponent,
  fetchAllClassFeeStructures,
  toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ClassFeeStructureComponentsForm extends Component {
  state = {
    selectedClassFeeStructureObject: "",
    classFeeStructureOptions: [],
    selectedClassFeeStructureHasError: false,
    selectedClassFeeStructureErrorMessage: "",
    feeComponentsOptions: [],
    selectedFeeComponentObject: "",
    selectedFeeComponentHasError: false,
    selectedFeeComponentErrorMessage: "",
    feeComponentRatio: "",
    feeComponentRatioHasError: false,
    feeComponentRatioErrorMessage: ""
  };

  componentDidMount() {
    this.props.fetchAllClassFeeStructures();
  }

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

    if (this.props.allFeeComponents !== prevProps.allFeeComponents) {
      if (this.props.allFeeComponents) {
        let allFeeComponents = this.props.allFeeComponents.map(item => {
          return {
            label: item.FeeComponentDescription,
            value: item.FeeComponentId
          };
        });
        this.setState({ feeComponentsOptions: allFeeComponents });
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
    } else if (!this.state.selectedFeeComponentObject) {
      this.setState({
        selectedFeeComponentHasError: true,
        selectedFeeComponentErrorMessage: "This field is required"
      });
    } else {
      const payload = {
        ClassFeeStructureId: this.state.selectedClassFeeStructureObject.value,
        FeeComponentId: this.state.selectedFeeComponentObject.value,
        FeeComponentRatio: this.state.feeComponentRatio
      };

      this.props.createClassFeeComponent(payload);
    }
  };

  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Class Fee Components</h3>
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
                        placeholder="Class Fee Structure"
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
                        placeholder="Fee Component"
                        name="selectedFeeComponentObject"
                        closeMenuOnSelect={true}
                        value={this.state.selectedFeeComponentObject}
                        onChange={value =>
                          this.setState({
                            ...this.state,
                            selectedFeeComponentObject: value
                          })
                        }
                        options={this.state.feeComponentsOptions}
                      />
                      <p
                        className={
                          this.state.selectedFeeComponentHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.selectedFeeComponentErrorMessage}
                      </p>
                    </div>
                  </Columns.Column>
                </Columns>

                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <input
                        name="feeComponentRatio"
                        className={
                          this.state.feeComponentRatioHasError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Fee Percentage"
                        value={this.state.feeComponentRatio}
                        type="number"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.feeComponentRatioHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.feeComponentRatioErrorMessage}
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

ClassFeeStructureComponentsForm.propTypes = {
  createClassFeeComponent: PropTypes.func.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  allClassFeeStructures: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllClassFeeStructures: PropTypes.func.isRequired,
  allFeeComponents: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  isCurrentActualTermCreated:
    state.admin_home.actualTerms.isCurrentActualTermCreated,
  allTermIterations: state.admin_home.termIterations.allTermIterations,
  allClassFeeStructures:
    state.admin_home.classFeeStructure.allClassFeeStructures,
  allFeeComponents: state.admin_home.feeComponents.allFeeComponents
});

const mapDispatchToProps = dispatch => ({
  createClassFeeComponent: payload =>
    dispatch(createClassFeeComponent(payload)),
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
  fetchAllClassFeeStructures: () => dispatch(fetchAllClassFeeStructures())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassFeeStructureComponentsForm);
