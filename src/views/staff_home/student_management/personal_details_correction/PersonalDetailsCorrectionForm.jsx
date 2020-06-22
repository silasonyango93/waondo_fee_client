import React, {Component} from 'react';
import {Columns} from "react-bulma-components/dist";
import Select from "react-select";
import ReactDatetime from "react-datetime";
import {transactionsServicePost} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";

class PersonalDetailsCorrectionForm extends Component {

    state = {
        admissionNumber: '',
        admissionNumberHasError: false,
        admissionNumberErrorMessage: '',
        SelectedGenderId: "",
        genderCategories: [
            { label: "Male", value: "1" },
            { label: "Female", value: "2" }
        ],
        SelectedGenderIdHasError: false,
        SelectedGenderIdErrorMessage: "",
        dateOfBirth: '',
        dateOfBirthHasError: false,
        dateOfBirthErrorMessage: '',
        studentName: '',
        studentNameHasError: false,
        studentNameErrorMessage: '',
        dbStudentDetails: ''
    };

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleAdmissionNumberKeyUp = async () =>{
        const payload = {
            admissionNumber: this.state.admissionNumber
        };
        const studentPersonalDetails = await transactionsServicePost(payload,"/students/get_a_student_personal_details");

        await this.setState({dbStudentDetails: studentPersonalDetails.data && studentPersonalDetails.data.studentDetailsAvailable ? studentPersonalDetails.data : ''});

    };

    render() {

        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Edit Student Details</h3>
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
                                            <input
                                                name="admissionNumber"
                                                className={
                                                    this.state.admissionNumberHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder={this.state.dbStudentDetails.studentName}
                                                value={this.state.admissionNumber}
                                                type="number"
                                                onChange={this.handleChange}
                                                autoFocus
                                                onKeyUp={()=>{this.handleAdmissionNumberKeyUp();}}
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

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <div className="form-group">
                                                <Select
                                                    className={
                                                        this.state.SelectedGenderIdHasError
                                                            ? "react-select personal__text-area-error"
                                                            : "react-select"
                                                    }
                                                    classNamePrefix="react-select"
                                                    placeholder={this.state.dbStudentDetails.genderDetails}
                                                    name="SelectedGenderId"
                                                    closeMenuOnSelect={true}
                                                    value={this.state.SelectedGenderId}
                                                    onChange={value =>
                                                        this.setState({
                                                            ...this.state,
                                                            SelectedGenderId: value
                                                        })
                                                    }
                                                    options={this.state.genderCategories}
                                                />
                                                <p
                                                    className={
                                                        this.state.SelectedGenderIdHasError
                                                            ? "personal__submision-error"
                                                            : "personal__hide"
                                                    }
                                                >
                                                    {this.state.SelectedGenderIdErrorMessage}
                                                </p>
                                            </div>
                                        </div>
                                    </Columns.Column>
                                </Columns>

                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <ReactDatetime
                                                name="dateOfBirth"
                                                value={this.state.dateOfBirth}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        dateOfBirth: value
                                                    })
                                                }
                                                inputProps={{
                                                    className: "form-control",
                                                    placeholder: this.state.dbStudentDetails.dateOfBirth
                                                }}
                                                timeFormat={false}
                                            />
                                            <p
                                                className={
                                                    this.state.dateOfBirthHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.dateOfBirthErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="studentName"
                                                className={
                                                    this.state.studentNameHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder={this.state.dbStudentDetails.studentName}
                                                value={this.state.studentName}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                            />
                                            <p
                                                className={
                                                    this.state.studentNameHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.studentNameErrorMessage}
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
                                <p
                                    className={
                                        !this.props.isStudentSuccessfullyRegistered
                                            ? "personal__error-text"
                                            : "personal__hide"
                                    }
                                >
                                    {this.props.studentRegistrationEventMessage}
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonalDetailsCorrectionForm;
