import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from "react-datetime";
import {PAYMENTS_MADE_ON_SPECIFIC_DATE} from "../../StaffHomeConstants";

class ExcelInstallmentDateSelectionForm extends Component {
    state = {
        startDate: "",
        startDateHasError: "",
        startDateErrorMessage: "",
        endDate: "",
        endHasError: "",
        endErrorMessage: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let startDate =
            this.state.startDate._d.getFullYear() +
            "-" +
            (this.state.startDate._d.getMonth() + 1) +
            "-" +
            this.state.startDate._d.getDate();

    };

    processFormTitle = () => {
        const {installmentExcelDownloadQueryScenario} = this.props;
        if (installmentExcelDownloadQueryScenario === PAYMENTS_MADE_ON_SPECIFIC_DATE) {
            return "Select payment date";
        }
        return "Select payment start and end dates";
    };

    render() {
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
                                            this.state.endHasError
                                                ? "personal__submision-error"
                                                : "personal__hide"
                                        }
                                    >
                                        {this.state.endErrorMessage}
                                    </p>
                                </div>
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
    installmentExcelDownloadQueryScenario: PropTypes.string.isRequired
};

export default ExcelInstallmentDateSelectionForm;
