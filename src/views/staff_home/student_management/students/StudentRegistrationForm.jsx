import React, { Component } from "react";
import ReactDatetime from "react-datetime";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Columns } from "react-bulma-components/dist";
import Select from "react-select";
import "./StudentRegistrationForm.scss";
import "../../../../config/common/ReactDatePicker.css";
import {ip} from "../../../../config/EndPoint";
import {fetchAllActualClasses} from "../../../../store/modules/admin_home/actions";
import {format} from "../../../../config/common/Utils";
import {registerAStudent} from "../../../../store/modules/staff_home/actions";

class StudentRegistrationForm extends Component {
    state = {
        studentName: "",
        admissionNumber: "",
        SelectedStudentType: "",
        studentTypeOptions: [
            { label: "Boarder", value: "1" },
            { label: "Day Scholar", value: "2" }
        ],
        SelectedGenderId: "",
        genderCategories: [
            { label: "Male", value: "1" },
            { label: "Female", value: "2" }
        ],
        classOptions: [],
        selectedClassOption: '',
        selectedClassOptionHasError: false,
        selectedClassOptionErrorMessage: '',
        dateOfBirth: "",
        image: null,
        profilePicDbName: "",
        studentNameHasError: false,
        studentNameErrorMessage: "",
        admissionNumberHasError: false,
        admissionNumberErrorMessage: "",
        SelectedGenderIdHasError: false,
        SelectedGenderIdErrorMessage: "",
        dateOfBirthHasError: false,
        dateOfBirthErrorMessage: "",
        formSubmissionError: false,
        SelectedStudentTypeHasError: false,
        SelectedStudentTypeErrorMessage: "",
    };

    componentDidMount() {
        this.props.fetchAllActualClasses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.allActualClasses !== prevProps.allActualClasses) {
            if (this.props.allActualClasses && this.props.allActualClasses.length) {
                let allActualClasses = this.props.allActualClasses.map((item, index) => {
                    return {
                        label: item.AcademicClassLevelName + " "+item.ClassStreamName,
                        value: item.ClassId
                    };
                });

                this.setState({ classOptions: allActualClasses });
            }
        }
    }

    resetFormValues = () =>{
        this.setState({
            name: "",
            admissionNumber: "",
            SelectedGenderId: "",
            dateOfBirth: "",
            image: null,
            profilePicDbName: "",
            studentNameHasError: false,
            studentNameErrorMessage: "",
            admissionNumberHasError: false,
            admissionNumberErrorMessage: "",
            SelectedGenderIdHasError: false,
            SelectedGenderIdErrorMessage: "",
            dateOfBirthHasError: false,
            dateOfBirthErrorMessage: "",
            formSubmissionError: false
        });
    };

    generateUUID = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    };

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleImageChange = e => {
        this.setState({
            image: e.target.files[0]
        });
    };

    containsANumber = input => {
        return /\d/.test(input);
    };

    submitClientDetailsWithoutImageUpload = event => {
        event.preventDefault();
        let dateOfBirth =
            this.state.dateOfBirth._d.getFullYear() +
            "-" +
            (this.state.dateOfBirth._d.getMonth() + 1) +
            "-" +
            this.state.dateOfBirth._d.getDate();

        const payload = {
            studentName: this.state.name,
            admissionNo: this.state.admissionNumber,
            profPicName: this.state.SelectedGenderId.value === "1"? "male_student.png" : "female_student.png",
            genderId: this.state.SelectedGenderId.value,
            studentDob: dateOfBirth,
            studentTypeId: this.state.SelectedStudentType.value,
            classId: this.state.selectedClassOption.value,
        };

        this.props.registerAStudent(payload);
    };

    handleImageSubmit = e => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append("file", this.state.image, this.state.image.name);
        let url = ip + "/upload_images";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(res => {
                this.submitAfterImageUpload(res.data)
            })
            .catch(err => console.log(err));
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            studentNameHasError: false,
            admissionNumberHasError: false
        });
        if (this.containsANumber(this.state.studentName)) {
            this.setState({
                studentNameHasError: true,
                studentNameErrorMessage: "Name must not contain a number"
            });
        }else if (isNaN(this.state.admissionNumber)) {
            this.setState({
                admissionNumberHasError: true,
                admissionNumberErrorMessage: "Admission number must not contain a letter"
            });
        }else if (format.test(this.state.admissionNumber)) {
            this.setState({
                admissionNumberHasError: true,
                admissionNumberErrorMessage: "Admission number must not contain special characters"
            });
        } else {
            if (this.state.image) {
                this.handleImageSubmit(event);
            } else {
                this.submitClientDetailsWithoutImageUpload(event);
            }
        }
    };


    submitAfterImageUpload = dbImageName =>{
        let dateOfBirth =
            this.state.dateOfBirth._d.getFullYear() +
            "-" +
            (this.state.dateOfBirth._d.getMonth() + 1) +
            "-" +
            this.state.dateOfBirth._d.getDate();

        const payload = {
            studentName: this.state.name,
            admissionNo: this.state.admissionNumber,
            profPicName: dbImageName,
            genderId: this.state.SelectedGenderId.value,
            studentDob: dateOfBirth,
            studentTypeId: this.state.SelectedStudentType.value,
            classId: this.state.selectedClassOption.value,
        };

        this.props.registerAStudent(payload);
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Student Details</h3>
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
                                                name="studentName"
                                                className={
                                                    this.state.studentNameHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Student Name"
                                                value={this.state.studentName}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
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
                                                    placeholder="Gender"
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
                                                    placeholder: "Date Of Birth"
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

                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <Select
                                                className={
                                                    this.state.selectedClassOptionHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Class"
                                                name="selectedClassOption"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedClassOption}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedClassOption: value
                                                    })
                                                }
                                                options={this.state.classOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.selectedClassOptionHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.selectedClassOptionErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <Select
                                                className={
                                                    this.state.SelectedStudentTypeHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Residence"
                                                name="SelectedStudentType"
                                                closeMenuOnSelect={true}
                                                value={this.state.SelectedStudentType}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        SelectedStudentType: value
                                                    })
                                                }
                                                options={this.state.studentTypeOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.SelectedStudentTypeHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.SelectedStudentTypeErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>
                                </Columns>


                                <div className="form-group">
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/png, image/jpeg"
                                        onChange={this.handleImageChange}
                                    />
                                </div>

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

StudentRegistrationForm.propTypes = {
    fetchAllActualClasses: PropTypes.func.isRequired,
    allActualClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
    registerAStudent: PropTypes.func.isRequired,
    studentRegistrationEventMessage: PropTypes.string.isRequired,
    isStudentSuccessfullyRegistered: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    allActualClasses: state.admin_home.actualClasses.allActualClasses,
    studentRegistrationEventMessage: state.staff_home.studentRegistration.studentRegistrationEventMessage,
    isStudentSuccessfullyRegistered: state.staff_home.studentRegistration.isStudentSuccessfullyRegistered
});

const mapDispatchToProps = dispatch => ({
    fetchAllActualClasses: () => dispatch(fetchAllActualClasses()),
    registerAStudent: payload => dispatch(registerAStudent(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentRegistrationForm);
