import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";
import {
    createFeeStructure,
     fetchAllFeeStructures,
    resetCurrentFeeStructureCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";

import "../../../../config/common/FormValidation.scss";

class FeeStructureForm extends Component {
    state = {
        feeStructure: "",
        feeStructureHassError: false,
        feeStructureErrorMessage: ""
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.isCurrentFeeStructureCreated !==
            prevProps.isCurrentFeeStructureCreated
        ) {
            if (this.props.isCurrentFeeStructureCreated) {
                this.props.fetchAllFeeStructures();
                this.props.resetCurrentFeeStructureCreated();
            }
        }
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
            sessionDetails
        } = this.props;

        if (!isNaN(this.state.feeStructure)) {
            this.setState({
                feeStructureHassError: true,
                feeStructureErrorMessage: "Fee component cannot contain a number"
            });
        } else {
            const payload = {
                UserId: sessionDetails && sessionDetails.userId ? sessionDetails.userId : '',
                FeeStructureDescription: this.state.feeStructure,
                IsCurrentFeeStructure: '0',
                IsProspect: '0'
            };

            this.props.createFeeStructure(payload);
            this.props.toggleAdminModalDisplay(false);
        }
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Fee Structures</h3>
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
                                                name="feeStructure"
                                                className={
                                                    this.state.feeStructureHassError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Fee Structure Description"
                                                value={this.state.feeStructure}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.feeStructureHassError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.feeStructureErrorMessage}
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

FeeStructureForm.propTypes = {
    createFeeStructure: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllFeeStructures: PropTypes.func.isRequired,
    isCurrentFeeStructureCreated: PropTypes.bool.isRequired,
    resetCurrentFeeStructureCreated: PropTypes.func.isRequired,
    sessionDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isCurrentFeeStructureCreated:
    state.admin_home.feeStructure.isCurrentFeeStructureCreated,
    sessionDetails: state.current_session.sessionDetails
});

const mapDispatchToProps = dispatch => ({
    createFeeStructure: payload => dispatch(createFeeStructure(payload)),
    toggleAdminModalDisplay: isAdminModalDisplayed =>
        dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
    fetchAllFeeStructures: () => dispatch(fetchAllFeeStructures()),
    resetCurrentFeeStructureCreated: () =>
        dispatch(resetCurrentFeeStructureCreated())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeStructureForm);
