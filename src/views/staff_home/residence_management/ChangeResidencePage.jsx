import React, {Component} from 'react';
import {Columns} from "react-bulma-components/dist";

import './ChangeResidencePage.scss';
import {promiselessApiPost} from "../../../services/api_connector/ApiConnector";
import {promiselessTransactionsServicePost} from "../../../services/transactions_service_connector/TransactionsServiceConnector";
import ErrorBand from "../../../components/modal_bands/error_band/ErrorBand";

class ChangeResidencePage extends Component {

    state = {
        admissionNumber: '',
        admissionNumberHasError: false,
        admissionNumberErrorMessage: '',
        displayChangeResidenceForm: true,
        displayEligibilityRevoked: false,
        eligibilityMessage: ''

    };

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleFormSubmit = async e => {
        e.preventDefault();

        const payload = {
            column_name: 'AdmissionNo',
            search_value: this.state.admissionNumber
        };
        const response = await promiselessApiPost(payload,"/get_specific_students");

        if(response.data.results && !response.data.results.length) {
            this.setState({
                admissionNumberHasError: true,
                admissionNumberErrorMessage: "No student exists by this admission number"
            });
        } else {

            const payload = {
                admissionNo: this.state.admissionNumber
            };

            const response = await promiselessTransactionsServicePost(payload,"/change_student_residence/confirm_residence_swap");
            if (!response.data.periodEligible) {
                this.setState({
                    displayChangeResidenceForm: false,
                    displayEligibilityRevoked: true,
                    eligibilityMessage: response.data.eligibilityMessage
                });
            }

        }
    };

    renderChangeResidenceForm = () => {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Change Student Residence</h3>
                    </div>
                    <div className="panel-body">
                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleFormSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset>
                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="admissionNumber"
                                                className={
                                                    this.state.admissionNumberHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Admission Number"
                                                value={this.state.admissionNumber}
                                                type="number"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.admissionNumberHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.admissionNumberErrorMessage}
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
    };


    renderEligibilityRevokedModal = () => {
        const { eligibilityMessage } = this.state;
        return (
            <div>
                <ErrorBand title="Request revoked"/>
                <div className="residence-page__modal-body">
                    {eligibilityMessage}
                </div>
            </div>);
    };


    render() {
        const { displayChangeResidenceForm, displayEligibilityRevoked } = this.state;
        return (
            <div>
                {displayChangeResidenceForm && this.renderChangeResidenceForm()}
                {displayEligibilityRevoked && this.renderEligibilityRevokedModal()}
            </div>
        );
    }
}

export default ChangeResidencePage;
