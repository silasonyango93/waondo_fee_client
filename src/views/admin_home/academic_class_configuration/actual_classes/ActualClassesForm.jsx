import React, { Component } from "react";
import Select from "react-select";
import "../../../../config/common/ReactDatePicker.css";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import "./ActualClasses.scss";
import {
    createActualLot,
    fetchAllActualLots,
    fetchAllTermIterations,
    resetCurrentActualLotCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ActualClassesForm extends Component {
    state = {
        selectedLotDescriptionObject: "",
        lotDescriptions: [],
        selectedLotDescriptionHasError: false,
        selectedLotDescriptionErrorMessage: "",
        selectedClassLevelObject: "",
        classLevels: [],
        selectedClassLevelHasError: false,
        selectedClassLevelErrorMessage: ""
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.isCurrentActualLotCreated !==
            prevProps.isCurrentActualLotCreated
        ) {
            if (this.props.isCurrentActualLotCreated) {
                this.props.fetchAllActualLots();
                this.props.resetCurrentActualLotCreated();
            }
        }

        if (this.props.allLotDescriptions !== prevProps.allLotDescriptions) {
            if (
                this.props.allLotDescriptions &&
                this.props.allLotDescriptions.length
            ) {
                let allLotDescriptions = this.props.allLotDescriptions.map(item => {
                    return {
                        label: item.LotDescription,
                        value: item.LotDescriptionId
                    };
                });
                this.setState({ lotDescriptions: allLotDescriptions });
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
                this.setState({ classLevels: allAcademicClassLevels });
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

        const {
            selectedLotDescriptionObject,
            selectedClassLevelObject
        } = this.state;
        if (!selectedLotDescriptionObject) {
            this.setState({
                selectedLotDescriptionHasError: true,
                selectedLotDescriptionErrorMessage: "This field is required"
            });
        } else if (!selectedClassLevelObject) {
            this.setState({
                selectedClassLevelHasError: true,
                selectedClassLevelErrorMessage: "This field is required"
            });
        } else {
        }

        const payload = {
            LotDescriptionId:selectedLotDescriptionObject.value,
            AcademicClassLevelId:selectedClassLevelObject.value
        };

        this.props.createActualLot(payload);
        this.props.toggleAdminModalDisplay(false);
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Actual Lots Registration</h3>
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
                                                    this.state.selectedLotDescriptionHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Description"
                                                name="selectedTermObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedLotDescriptionObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedLotDescriptionObject: value,
                                                        selectedLotDescriptionHasError: false,
                                                        selectedLotDescriptionErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.lotDescriptions}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedLotDescriptionHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedLotDescriptionErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <Select
                                                className={
                                                    this.state.selectedClassLevelHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Class Level"
                                                name="selectedTermIterationObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedClassLevelObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedClassLevelObject: value,
                                                        selectedClassLevelHasError: false,
                                                        selectedClassLevelErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.classLevels}
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


                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="classStreamName"
                                                className={
                                                    this.state.classStreamNameHassError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Class Stream Name"
                                                value={this.state.classStreamName}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.classStreamNameHassError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.classStreamNameErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
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

ActualClassesForm.propTypes = {
    createActualLot: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllActualLots: PropTypes.func.isRequired,
    isCurrentActualLotCreated: PropTypes.bool.isRequired,
    resetCurrentActualLotCreated: PropTypes.func.isRequired,
    allLotDescriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    allAcademicClassLevels: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllTermIterations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isCurrentActualLotCreated:
    state.admin_home.actualLots.isCurrentActualLotCreated,
    allLotDescriptions: state.admin_home.lotDescriptions.allLotDescriptions,
    allAcademicClassLevels: state.admin_home.allAcademicClassLevels
});

const mapDispatchToProps = dispatch => ({
    createActualLot: payload => dispatch(createActualLot(payload)),
    toggleAdminModalDisplay: isAdminModalDisplayed =>
        dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
    fetchAllActualLots: () => dispatch(fetchAllActualLots()),
    resetCurrentActualLotCreated: () => dispatch(resetCurrentActualLotCreated()),
    fetchAllTermIterations: () => dispatch(fetchAllTermIterations())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActualClassesForm);
