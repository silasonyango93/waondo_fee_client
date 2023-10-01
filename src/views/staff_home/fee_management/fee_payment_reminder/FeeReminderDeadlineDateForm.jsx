import React, {Component} from 'react';
import ReactDatetime from "react-datetime";

import './FeeReminderDeadlineDateForm.scss';

class FeeReminderDeadlineDateForm extends Component {
    state = {
        deadlineDate: "",
        deadlineDateHasError: "",
        deadlineDateErrorMessage: ""
    };

    handleSubmit = () => {

    };
    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Set Fee Payment Deadline Date</h3>
                    </div>
                    <div className="panel-body">
                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset>
                                <div className="form-group deadline__field-set-div">
                                    <ReactDatetime
                                        name="deadlineDate"
                                        value={this.state.deadlineDate}
                                        onChange={value =>
                                            this.setState({
                                                ...this.state,
                                                deadlineDate: value
                                            })
                                        }
                                        inputProps={{
                                            className: "form-control",
                                            placeholder: "Term Start Date"
                                        }}
                                        timeFormat={false}
                                    />
                                    <p
                                        className={
                                            this.state.deadlineDateHasError
                                                ? "personal__submision-error"
                                                : "personal__hide"
                                        }
                                    >
                                        {this.state.deadlineDateErrorMessage}
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

FeeReminderDeadlineDateForm.propTypes = {};

export default FeeReminderDeadlineDateForm;
