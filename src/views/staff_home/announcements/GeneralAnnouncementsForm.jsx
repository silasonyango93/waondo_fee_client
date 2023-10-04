import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from "react-bulma-components";
import './GeneralAnnouncementsForm.scss'
import Select from "react-select";
import {
    ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE,
    SPECIFIC_CLASS_ANNOUNCEMENT_TYPE,
    SPECIFIC_STREAM_ANNOUNCEMENT_TYPE
} from "./AnnouncementTypesConstants";
import {connect} from "react-redux";
import {fetchAllActualClasses, fetchAllLotsNotCompletedSchool} from "../../../store/modules/admin_home/actions";
import {formatString} from "../../../config/common/Utils";
import ActionConfirmationView from "../../../components/action_confirmation/ActionConfirmationView";

class GeneralAnnouncementsForm extends Component {
    state = {
        selectedItemObject: "",
        selectedItemHasError: false,
        selectedItemErrorMessage: "",
        itemOptions: [],
        announcementMessage: "",
        announcementMessageHasError: false,
        announcementMessageErrorMessage: "",
        payload: "",
        displayPublishAnnouncementConfirmation: false
    };

    componentDidMount() {
        const {announcementType, fetchAllLotsNotCompletedSchool, fetchAllActualClasses} = this.props;
        if (announcementType === SPECIFIC_CLASS_ANNOUNCEMENT_TYPE) {
            fetchAllLotsNotCompletedSchool();
        }
        if (announcementType === SPECIFIC_STREAM_ANNOUNCEMENT_TYPE) {
            fetchAllActualClasses();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {announcementType} = this.props;
        if (announcementType === SPECIFIC_CLASS_ANNOUNCEMENT_TYPE) {
            if (this.props.allActualLots !== prevProps.allActualLots) {
                if (this.props.allActualLots && this.props.allActualLots.length) {
                    let allActualLots = this.props.allActualLots.map(
                        (item, index) => {
                            return {
                                label: formatString("Form {0}", item.AcademicClassLevelName),
                                value: item.LotId
                            };
                        }
                    );

                    this.setState({itemOptions: allActualLots});
                }
            }
        }

        if (announcementType === SPECIFIC_STREAM_ANNOUNCEMENT_TYPE) {
            if (this.props.allActualClasses !== prevProps.allActualClasses) {
                if (this.props.allActualClasses && this.props.allActualClasses.length) {
                    let allActualClasses = this.props.allActualClasses.map(
                        (item, index) => {
                            return {
                                label: item.AcademicClassLevelName + " " + item.ClassStreamName,
                                value: item.ClassId
                            };
                        }
                    );

                    this.setState({itemOptions: allActualClasses});
                }
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

    processFormTitle = () => {
        const {announcementType} = this.props;
        if (announcementType === ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE) {
            return "Entire School Announcement"
        }
        if (announcementType === SPECIFIC_CLASS_ANNOUNCEMENT_TYPE) {
            return "Class Announcement"
        }
        if (announcementType === SPECIFIC_STREAM_ANNOUNCEMENT_TYPE) {
            return "Stream Announcement"
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {announcementMessage, selectedItemObject} = this.state;
        const {announcementType} = this.props;
        if (announcementType !== ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE && !selectedItemObject.length) {
            this.setState({
                selectedItemHasError: true
                , selectedItemErrorMessage: "This field must not be left blank."
            });
        } else {
            if (announcementType === ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE) {
                const payload = {
                    announcementMessage: announcementMessage
                };
                this.setState({payload: payload, displayPublishAnnouncementConfirmation: true});
            }
            if (announcementType === SPECIFIC_CLASS_ANNOUNCEMENT_TYPE) {
                const payload = {
                    lotId: selectedItemObject.value,
                    announcementMessage: announcementMessage
                };
                this.setState({payload: payload, displayPublishAnnouncementConfirmation: true});
            }
            if (announcementType === SPECIFIC_STREAM_ANNOUNCEMENT_TYPE) {
                const payload = {
                    classId: selectedItemObject.value,
                    announcementMessage: announcementMessage
                };
                this.setState({payload: payload, displayPublishAnnouncementConfirmation: true});
            }
        }
    };

    processConfirmationModalPrompt = () => {
        const {selectedItemObject} = this.state;
        const {announcementType} = this.props;
        if (announcementType === ENTIRE_SCHOOL_ANNOUNCEMENT_TYPE) {
            return "You are about to send this broadcast message to parents of the entire school";
        }
        if (announcementType === SPECIFIC_CLASS_ANNOUNCEMENT_TYPE) {
            return formatString("You are about to send this broadcast message to parents of {0}", selectedItemObject.label);
        }
        if (announcementType === SPECIFIC_STREAM_ANNOUNCEMENT_TYPE) {
            return formatString("You are about to send this broadcast message to parents of {0}", selectedItemObject.label);
        }
    };

    handleConfirmButtonClicked = () => {
    };
    handleRejectButtonClicked = () => {
    };

    render() {
        const {displayPublishAnnouncementConfirmation} = this.state;
        const {isSelectOptionsWidgetRequired} = this.props;
        return (
            <Container fluid className="general-announcement__container">
                {!displayPublishAnnouncementConfirmation && (
                    <div className="login-panel panel panel-default dialog__main-body">
                        <div className="panel-heading">
                            <h3 className="panel-title">{this.processFormTitle()}</h3>
                        </div>
                        <div className="panel-body">
                            <form
                                action=""
                                method="POST"
                                onSubmit={this.handleSubmit}
                                encType="multipart/form-data"
                            >
                                <fieldset>
                                    {isSelectOptionsWidgetRequired && (<div className="form-group">
                                        <Select
                                            className={
                                                this.state.selectedItemHasError
                                                    ? "react-select personal__text-area-error"
                                                    : "react-select"
                                            }
                                            classNamePrefix="react-select"
                                            placeholder="Class"
                                            name="selectedClassObject"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedItemObject}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedItemObject: value,
                                                    selectedItemHasError: false,
                                                    selectedItemErrorMessage: ""
                                                })
                                            }
                                            options={this.state.itemOptions}
                                        />
                                        <p
                                            className={
                                                this.state.selectedItemHasError
                                                    ? "personal__submision-error"
                                                    : "personal__hide"
                                            }
                                        >
                                            {this.state.selectedItemErrorMessage}
                                        </p>
                                    </div>)}

                                    <div className="form-group">
                                    <textarea
                                        name="announcementMessage"
                                        className={
                                            this.state.announcementMessageHasError
                                                ? "form-control personal__text-area-error"
                                                : "form-control"
                                        }
                                        placeholder="Key in your announcement here"
                                        value={this.state.announcementMessage}
                                        onChange={this.handleChange}
                                        autoFocus
                                        required
                                    />
                                        <p
                                            className={
                                                this.state.announcementMessageHasError
                                                    ? "personal__submision-error"
                                                    : "personal__hide"
                                            }
                                        >
                                            {this.state.announcementMessageErrorMessage}
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-success btn-block general-announcement__submit-button"
                                    >
                                        Submit
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>)}
                {displayPublishAnnouncementConfirmation && (<ActionConfirmationView title="Send Broadcast Message"
                                                                                    promptText={this.processConfirmationModalPrompt()}
                                                                                    handleConfirmButtonClicked={this.handleConfirmButtonClicked}
                                                                                    handleRejectButtonClicked={this.handleRejectButtonClicked}/>)}
            </Container>
        );
    }
}

GeneralAnnouncementsForm.propTypes = {
    announcementType: PropTypes.string.isRequired,
    isSelectOptionsWidgetRequired: PropTypes.bool.isRequired,
    allActualClasses: PropTypes.arrayOf(PropTypes.object),
    allActualLots: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
    allActualClasses: state.admin_home.actualClasses.allActualClasses,
    allActualLots: state.admin_home.actualLots.allActualLots
});

const mapDispatchToProps = dispatch => ({
    fetchAllActualClasses: () => dispatch(fetchAllActualClasses()),
    fetchAllLotsNotCompletedSchool: () => dispatch(fetchAllLotsNotCompletedSchool())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GeneralAnnouncementsForm);
