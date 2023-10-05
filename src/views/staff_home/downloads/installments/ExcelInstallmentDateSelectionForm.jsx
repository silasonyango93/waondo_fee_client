import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from "react-datetime";
import {PAYMENTS_MADE_ON_SPECIFIC_DATE, PAYMENTS_MADE_WITHIN_A_DATE_RANGE} from "../../StaffHomeConstants";
import {formatString, today} from "../../../../config/common/Utils";
import {transactionsIp} from "../../../../config/EndPoint";
import {
    downloadExcelFileFromBackend
} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";

class ExcelInstallmentDateSelectionForm extends Component {
    state = {
        startDate: "",
        startDateHasError: "",
        startDateErrorMessage: "",
        endDate: "",
        endDateHasError: "",
        endDateErrorMessage: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {installmentExcelDownloadQueryScenario, handleFinalSubmitButtonClicked} = this.props;
        const {startDate, endDate} = this.state;
        if (!startDate) {
            this.setState({startDateHasError: true, startDateErrorMessage: "This field cannot be blank"});
        } else if (installmentExcelDownloadQueryScenario === PAYMENTS_MADE_WITHIN_A_DATE_RANGE
            && (!endDate)) {
            this.setState({endDateHasError: true, endDateErrorMessage: "This field cannot be blank"});
        } else {
            if (installmentExcelDownloadQueryScenario === PAYMENTS_MADE_ON_SPECIFIC_DATE) {
                let installmentDate =
                    startDate._d.getFullYear() +
                    "-" +
                    (this.processDateCharacters((startDate._d.getMonth() + 1).toString())) +
                    "-" +
                    this.processDateCharacters(startDate._d.getDate().toString());
                const url = formatString("{0}/installments/excel/fee-installments-made-on-a-specific-date?installmentDate={1}"
                    , transactionsIp, installmentDate);
                downloadExcelFileFromBackend(url, formatString("{0}'s fee payments", installmentDate));
            } else {
                let installmentStartDate =
                    startDate._d.getFullYear() +
                    "-" +
                    (this.processDateCharacters((startDate._d.getMonth() + 1).toString())) +
                    "-" +
                    this.processDateCharacters(startDate._d.getDate().toString());
                let installmentEndDate =
                    endDate._d.getFullYear() +
                    "-" +
                    (this.processDateCharacters((endDate._d.getMonth() + 1).toString())) +
                    "-" +
                    this.processDateCharacters(endDate._d.getDate().toString());
                const url = formatString("{0}/installments/excel/fee-installments-made-between-two-dates?" +
                    "startDate={1}&endDate={2}"
                    , transactionsIp, installmentStartDate, installmentEndDate);
                downloadExcelFileFromBackend(url, formatString("Fee payments made between {0} and {1}"
                    , installmentStartDate, installmentEndDate));
            }
            handleFinalSubmitButtonClicked();
        }

    };

    processDateCharacters = (character) => {
        if (character.length > 1) {
            return character;
        } else {
            return formatString("0{0}", character);
        }
    };

    processFormTitle = () => {
        const {installmentExcelDownloadQueryScenario} = this.props;
        if (installmentExcelDownloadQueryScenario === PAYMENTS_MADE_ON_SPECIFIC_DATE) {
            return "Select fee payment date";
        }
        return "Select fee payment start and end dates";
    };

    render() {
        const {installmentExcelDownloadQueryScenario} = this.props;
        return (
            <div>
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
                                <div className="form-group">
                                    <ReactDatetime
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={value =>
                                            this.setState({
                                                ...this.state,
                                                startDate: value
                                            })
                                        }
                                        inputProps={{
                                            className: "form-control",
                                            placeholder: "Start Date"
                                        }}
                                        timeFormat={false}
                                    />
                                    <p
                                        className={
                                            this.state.startDateHasError
                                                ? "personal__submision-error"
                                                : "personal__hide"
                                        }
                                    >
                                        {this.state.startDateErrorMessage}
                                    </p>
                                </div>

                                {installmentExcelDownloadQueryScenario === PAYMENTS_MADE_WITHIN_A_DATE_RANGE && (
                                    <div className="form-group">
                                        <ReactDatetime
                                            name="endDate"
                                            value={this.state.endDate}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    endDate: value
                                                })
                                            }
                                            inputProps={{
                                                className: "form-control",
                                                placeholder: "End Date"
                                            }}
                                            timeFormat={false}
                                        />
                                        <p
                                            className={
                                                this.state.endDateHasError
                                                    ? "personal__submision-error"
                                                    : "personal__hide"
                                            }
                                        >
                                            {this.state.endDateErrorMessage}
                                        </p>
                                    </div>)}
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

ExcelInstallmentDateSelectionForm.propTypes = {
    installmentExcelDownloadQueryScenario: PropTypes.string.isRequired,
    handleFinalSubmitButtonClicked: PropTypes.func.isRequired
};

export default ExcelInstallmentDateSelectionForm;
