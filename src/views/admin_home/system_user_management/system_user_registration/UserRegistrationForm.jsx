import React, { Component } from "react";
import Select from "react-select";
import '../../../../config/common/ReactDatePicker.css';
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";

import './UserRegistration.scss';
import {
    assignAUserRoles,
    registerAUser,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";
import {containsANumber} from "../../../../config/common/Utils";

class UserRegistrationForm extends Component {
    state = {
        name: '',
        nameHasError: false,
        nameErrorMessage: '',
        email: '',
        emailHasError: false,
        emailErrorMessage: '',
        genderOptions: [
            {label: 'Male', value: '1'},
            {label: 'Female', value: '2'}
        ],
        selectedGenderOption: '',
        genderHasError: false,
        genderErrorMessage: '',
        password: '',
        passwordHasError: false,
        passwordErrorMessage: '',
        confirmPassword: '',
        confirmPasswordHasError: false,
        confirmPasswordErrorMessage: ''
    };



    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.name) {
           this.setState({nameHasError: true, nameErrorMessage: 'Name cannot be blank'});
        } else if(containsANumber(this.state.name)) {
            this.setState({nameHasError: true, nameErrorMessage: 'Name cannot contain a number'});
        } else if(!this.state.email) {
            this.setState({emailHasError: true, emailErrorMessage: 'Email cannot be blank'});
        } else if(!this.state.selectedGenderOption) {
            this.setState({genderHasError: true, genderErrorMessage: 'Gender cannot be blank'});
        } else if(!this.state.password) {
            this.setState({passwordHasError: true, passwordErrorMessage: 'Password cannot be blank'});
        } else if(!this.state.confirmPassword) {
            this.setState({confirmPasswordHasError: true, confirmPasswordErrorMessage: 'Password cannot be blank'});
        } else if(this.state.confirmPassword !== this.state.password) {
            this.setState({confirmPasswordHasError: true, confirmPasswordErrorMessage: 'Confirmation password not the same as actual password'});
        } else {
            const payload = {
                name:this.state.name,
                email:this.state.email,
                genderId:this.state.selectedGenderOption.value,
                encryptedPassword:this.state.password,
            };

            this.props.registerAUser(payload);
            this.props.toggleAdminModalDisplay(false);
        }

    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">System User Registration</h3>
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
                                                name="name"
                                                className={
                                                    this.state.nameHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Name"
                                                value={this.state.name}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.nameHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.nameErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                className={
                                                    this.state.emailHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Email"
                                                value={this.state.email}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.emailHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.emailErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>
                                </Columns>

                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <Select
                                                className={
                                                    this.state.genderHasError
                                                        ? "react-select personal__text-area-error"
                                                        : "react-select"
                                                }
                                                classNamePrefix="react-select"
                                                placeholder="Gender"
                                                name="selectedGenderOption"
                                                closeMenuOnSelect={true}
                                                value={this.state.selectedGenderOption}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        selectedGenderOption: value,
                                                        genderHasError: false,
                                                        genderErrorMessage: ""
                                                    })
                                                }
                                                options={this.state.genderOptions}
                                            />
                                            <p
                                                className={
                                                    this.state.genderHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.genderErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>

                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                className={
                                                    this.state.passwordHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Password"
                                                value={this.state.password}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.passwordHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.passwordErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>
                                </Columns>


                                <Columns>
                                    <Columns.Column size="one-half">
                                        <div className="form-group">
                                            <input
                                                name="confirmPassword"
                                                className={
                                                    this.state.confirmPasswordHasError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Confirm Password"
                                                value={this.state.confirmPassword}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.confirmPasswordHasError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.confirmPasswordErrorMessage}
                                            </p>
                                        </div>
                                    </Columns.Column>
                                    <Columns.Column size="one-half"></Columns.Column>
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

UserRegistrationForm.propTypes = {
    registerAUser: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    assignAUserRoles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    registerAUser: payload => dispatch(registerAUser(payload)),
    assignAUserRoles: payload => dispatch(assignAUserRoles(payload)),
    toggleAdminModalDisplay: isAdminModalDisplayed =>
        dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegistrationForm);
