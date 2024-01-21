import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Columns} from "react-bulma-components";
import Select from "react-select";

class StudentsFilterForm extends Component {

    state = {
        selectedStudentsTypeObject: "",
        studentsTypes: [],
        selectedStudentsTypeHasError: false,
        selectedStudentsTypeErrorMessage: ""
    };

    componentDidMount() {
        let choices = [
            {label: "Continuing Students", value: 1},
            {label: "Students Completed School", value: 0}
        ]
        this.setState({studentsTypes: choices});
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
            selectedStudentsTypeObject
        } = this.state;
        if (!selectedStudentsTypeObject) {
            this.setState({
                selectedStudentsTypeHasError: true,
                selectedStudentsTypeErrorMessage: "This field is required"
            });
        } else {
            this.props.handleStudentFilterSubmitButtonIsClicked(selectedStudentsTypeObject.value === 1);
        }
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Select the type of students.</h3>
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
                                    <Select
                                        className={
                                            this.state.selectedStudentsTypeHasError
                                                ? "react-select personal__text-area-error"
                                                : "react-select"
                                        }
                                        classNamePrefix="react-select"
                                        placeholder="Students Type"
                                        name="selectedStudentsTypeObject"
                                        closeMenuOnSelect={true}
                                        value={this.state.selectedStudentsTypeObject}
                                        onChange={value =>
                                            this.setState({
                                                ...this.state,
                                                selectedStudentsTypeObject: value,
                                                selectedStudentsTypeHasError: false,
                                                selectedStudentsTypeErrorMessage: ""
                                            })
                                        }
                                        options={this.state.studentsTypes}
                                    />
                                    <p
                                        className={
                                            this.state.selectedStudentsTypeHasError
                                                ? "personal__submision-error"
                                                : "personal__hide"
                                        }
                                    >
                                        {this.state.selectedStudentsTypeErrorMessage}
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

StudentsFilterForm.propTypes = {
    handleStudentFilterSubmitButtonIsClicked: PropTypes.func.isRequired
};

export default StudentsFilterForm;