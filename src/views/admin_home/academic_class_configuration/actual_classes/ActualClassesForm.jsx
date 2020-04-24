import React, { Component } from "react";
import Select from "react-select";
import "../../../../config/common/ReactDatePicker.css";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import "./ActualClasses.scss";
import {
    createActualClass,
    createActualLot, fetchAllActualClasses,
    fetchAllTermIterations, resetCurrentActualClassCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

class ActualClassesForm extends Component {
    state = {
        selectedLotObject: "",
        lots: [],
        selectedLotHasError: false,
        selectedLotErrorMessage: "",
        selectedClassStreamObject: "",
        classStreams: [],
        selectedClassStreamHasError: false,
        selectedClassStreamErrorMessage: "",
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.isCurrentActualClassCreated !==
            prevProps.isCurrentActualClassCreated
        ) {
            if (this.props.isCurrentActualClassCreated) {
                this.props.fetchAllActualClasses();
                this.props.resetCurrentActualClassCreated();
            }
        }

        if (this.props.allActualLots !== prevProps.allActualLots) {
            if (
                this.props.allActualLots &&
                this.props.allActualLots.length
            ) {
                let allActualLots = this.props.allActualLots.map(item => {
                    return {
                        label: item.LotDescription + "(" + item.AcademicClassLevelName + ")",
                        value: item.LotId
                    };
                });
                this.setState({ lots: allActualLots });
            }
        }

        if (this.props.allClassStreams !== prevProps.allClassStreams) {
            if (this.props.allClassStreams && this.props.allClassStreams.length) {
                let allClassStreams = this.props.allClassStreams.map(item => {
                    return {
                        label: item.ClassStreamName,
                        value: item.ClassStreamId
                    };
                });
                this.setState({ classStreams: allClassStreams });
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
            selectedLotObject,
            selectedClassStreamObject
        } = this.state;
        if (!selectedLotObject) {
            this.setState({
                selectedLotHasError: true,
                selectedLotErrorMessage: "This field is required"
            });
        } else if (!selectedClassStreamObject) {
            this.setState({
                selectedClassStreamHasError: true,
                selectedClassStreamErrorMessage: "This field is required"
            });
        } else {
            const payload = {
                LotId: selectedLotObject.value,
                ClassStreamId: selectedClassStreamObject.value,
            };

            this.props.createActualClass(payload);
            this.props.toggleAdminModalDisplay(false);
        }


    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Actual Classes Registration</h3>
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
                                                    this.state.selectedLotHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Lot"
                                                name="selectedLotObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedLotObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedLotObject: value,
                                                        selectedLotHasError: false,
                                                        selectedLotDescriptionErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.lots}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedLotHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedLotErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <Select
                                                className={
                                                    this.state.selectedClassStreamHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Class Stream"
                                                name="selectedClassStreamObject"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedClassStreamObject}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedClassStreamObject: value,
                                                        selectedClassStreamHasError: false,
                                                        selectedClassStreamErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.classStreams}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedClassStreamHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedClassStreamErrorMessage}
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

ActualClassesForm.propTypes = {
    createActualClass: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllActualClasses: PropTypes.func.isRequired,
    isCurrentActualClassCreated: PropTypes.bool.isRequired,
    resetCurrentActualClassCreated: PropTypes.func.isRequired,
    allActualLots: PropTypes.arrayOf(PropTypes.object).isRequired,
    allClassStreams: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllTermIterations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isCurrentActualClassCreated:
    state.admin_home.actualClasses.isCurrentActualClassCreated,
    allActualLots: state.admin_home.actualLots.allActualLots,
    allClassStreams: state.admin_home.classStreams.allClassStreams
});

const mapDispatchToProps = dispatch => ({
    createActualClass: payload => dispatch(createActualClass(payload)),
    toggleAdminModalDisplay: isAdminModalDisplayed =>
        dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
    fetchAllActualClasses: () => dispatch(fetchAllActualClasses()),
    resetCurrentActualClassCreated: () => dispatch(resetCurrentActualClassCreated()),
    fetchAllTermIterations: () => dispatch(fetchAllTermIterations())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActualClassesForm);
