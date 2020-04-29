import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import {
    createClassStreams, createLotDescription, fetchAllFeeComponents,
    fetchAllLotDescriptions, resetCurrentFeeComponentCreated,
    resetCurrentLotDescriptionCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";
import { connect } from "react-redux";

class FeeComponentsForm extends Component {
    state = {
        feeComponent: "",
        feeComponentHassError: false,
        feeComponentErrorMessage: ""
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.isCurrentFeeComponentCreated !==
            prevProps.isCurrentFeeComponentCreated
        ) {
            if (this.props.isCurrentFeeComponentCreated) {
                this.props.fetchAllFeeComponents();
                this.props.resetCurrentFeeComponentCreated();
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
        const payload = {
            LotDescription: this.state.lotDescription
        };

        this.props.createLotDescription(payload);
        this.props.toggleAdminModalDisplay(false);
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Fee Components</h3>
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
                                                name="feeComponent"
                                                className={
                                                    this.state.feeComponentHassError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Fee Component"
                                                value={this.state.feeComponent}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.feeComponentHassError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.feeComponentErrorMessage}
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

FeeComponentsForm.propTypes = {
    createLotDescription: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllFeeComponents: PropTypes.func.isRequired,
    isCurrentFeeComponentCreated: PropTypes.bool.isRequired,
    resetCurrentFeeComponentCreated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isCurrentFeeComponentCreated:
    state.admin_home.feeComponents.isCurrentFeeComponentCreated
});

const mapDispatchToProps = dispatch => ({
    createLotDescription: payload => dispatch(createLotDescription(payload)),
    toggleAdminModalDisplay: isAdminModalDisplayed =>
        dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
    fetchAllFeeComponents: () => dispatch(fetchAllFeeComponents()),
    resetCurrentFeeComponentCreated: () =>
        dispatch(resetCurrentFeeComponentCreated())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeComponentsForm);
