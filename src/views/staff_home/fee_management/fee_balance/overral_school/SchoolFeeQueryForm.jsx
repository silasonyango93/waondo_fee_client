import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";
import {getAllStudentsWithAMinimumTermBalance} from "../../../../../store/modules/staff_home/actions";


class SchoolFeeQueryForm extends Component {
    state = {
        minimumFeeBalance: "",
        minimumFeeBalanceHassError: false,
        minimumFeeBalanceErrorMessage: ""
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
        const payload = {
            minimumFeeBalance: this.state.minimumFeeBalance
        };

        this.props.getAllStudentsWithAMinimumTermBalance(payload);
        this.props.closeSchoolFeeQueryModal(this.state.minimumFeeBalance);
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Send Students Home</h3>
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
                                                name="minimumFeeBalance"
                                                className={
                                                    this.state.minimumFeeBalanceHassError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Minimum Fee Balance"
                                                value={this.state.minimumFeeBalance}
                                                type="number"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.minimumFeeBalanceHassError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.minimumFeeBalanceErrorMessage}
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
    }
}

SchoolFeeQueryForm.propTypes = {
    getAllStudentsWithAMinimumTermBalance: PropTypes.func.isRequired,
    closeSchoolFeeQueryModal: PropTypes.func.isRequired
};


const mapDispatchToProps = dispatch => ({
    getAllStudentsWithAMinimumTermBalance: payload => dispatch(getAllStudentsWithAMinimumTermBalance(payload))
});

export default connect(
    null,
    mapDispatchToProps
)(SchoolFeeQueryForm);
