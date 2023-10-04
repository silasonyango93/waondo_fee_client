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

class GeneralAnnouncementsForm extends Component {
    state = {
        selectedItemObject: "",
        selectedItemHasError: false,
        selectedItemErrorMessage: "",
        itemOptions: [],
        announcementMessage: "",
        announcementMessageHasError: false,
        announcementMessageErrorMessage: ""
    };

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

    render() {
        const {isSelectOptionsWidgetRequired} = this.props;
        return (
            <Container fluid className="general-announcement__container">
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
                </div>
            </Container>
        );
    }
}

GeneralAnnouncementsForm.propTypes = {
    announcementType: PropTypes.string.isRequired,
    isSelectOptionsWidgetRequired: PropTypes.bool.isRequired
};

export default GeneralAnnouncementsForm;
