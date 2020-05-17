import React, { Component } from "react";
import ReactDatetime from "react-datetime";
import YearPicker from "react-year-picker";
import Select from "react-select";
import '../../../../config/common/ReactDatePicker.css';
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import {
    createActualTerm, createClassFeeStructure,
    fetchAllActualTerms, fetchAllTermIterations,
    resetCurrentActualTermCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ClassFeeStructureForm extends Component {
    state = {
        selectedFeeStructureObject: "",
        feeStructureOptions: [],
        selectedFeeStructureHasError: false,
        selectedFeeStructureErrorMessage: "",
        classLevelOptions:[],
        selectedClassLevelObject: "",
        selectedClassLevelHasError: false,
        selectedClassLevelErrorMessage: ""
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.allFeeStructures !== prevProps.allFeeStructures) {
            if(this.props.allFeeStructures) {
                let allFeeStructures = this.props.allFeeStructures.map((item, index) => {
                    return {
                        label: item.FeeStructureDescription,
                        value: item.FeeStructureId
                    };
                });
                this.setState({feeStructureOptions: allFeeStructures});
            }
        }

        if (this.props.allAcademicClassLevels !== prevProps.allAcademicClassLevels) {
            if (this.props.allAcademicClassLevels) {
                let allAcademicClassLevels = this.props.allAcademicClassLevels.map(item => {
                    return {
                        label: item.AcademicClassLevelName,
                        value: item.AcademicClassLevelId
                    };
                });
                this.setState({ classLevelOptions: allAcademicClassLevels });
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

        if(!this.state.selectedFeeStructureObject) {
            this.setState({selectedFeeStructureHasError: true, selectedFeeStructureErrorMessage: "Fee structure is required"});
        } else if(!this.state.selectedClassLevelObject) {
            this.setState({selectedClassLevelHasError: true, selectedClassLevelErrorMessage: "Class is required"});
        } else {
            const payload = {
                FeeStructureId: this.state.selectedFeeStructureObject.value,
                AcademicClassLevelId: this.state.selectedClassLevelObject.value
            };

            this.props.createClassFeeStructure(payload);
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
                                                    this.state.selectedFeeStructureHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Fee Structure"
                                                name="selectedFeeStructureObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedFeeStructureObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedFeeStructureObject: value
                                                    })
                                                }
                                                options={this.state.feeStructureOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedFeeStructureHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedFeeStructureErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                </Columns>

                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <Select
                                                className={
                                                    this.state.selectedClassLevelHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Class"
                                                name="selectedClassLevelObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedClassLevelObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedClassLevelObject: value
                                                    })
                                                }
                                                options={this.state.classLevelOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedClassLevelHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedClassLevelErrorMessage}
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

ClassFeeStructureForm.propTypes = {
    createClassFeeStructure: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllActualTerms: PropTypes.func.isRequired,
    isCurrentActualTermCreated: PropTypes.bool.isRequired,
    resetCurrentActualTermCreated: PropTypes.func.isRequired,
    allTermIterations: PropTypes.arrayOf(PropTypes.object)
        .isRequired,
    fetchAllTermIterations: PropTypes.func.isRequired,
    allAcademicClassLevels: PropTypes.arrayOf(PropTypes.object).isRequired,
    allFeeStructures: PropTypes.arrayOf(PropTypes.object)
        .isRequired,
};

const mapStateToProps = state => ({
    isCurrentActualTermCreated:
    state.admin_home.actualTerms.isCurrentActualTermCreated,
    allTermIterations:
    state.admin_home.termIterations.allTermIterations,
    allFeeStructures:
    state.admin_home.feeStructure.allFeeStructures,
    allAcademicClassLevels: state.admin_home.allAcademicClassLevels
});

const mapDispatchToProps = dispatch => ({
    createClassFeeStructure: payload => dispatch(createClassFeeStructure(payload)),
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
)(ClassFeeStructureForm);
