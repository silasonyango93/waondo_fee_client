import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import {
    createClassStreams,
     fetchAllLotDescriptions,
     resetCurrentLotDescriptionCreated,
    toggleAdminModalDisplay
} from "../../../../store/modules/admin_home/actions";
import { connect } from "react-redux";

class LotDescriptionForm extends Component {
    state = {
        lotDescription: "",
        lotDescriptionHassError: false,
        lotDescriptionErrorMessage: ""
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.isCurrentLotDescriptionCreated !==
            prevProps.isCurrentLotDescriptionCreated
        ) {
            if (this.props.isCurrentLotDescriptionCreated) {
                this.props.fetchAllLotDescriptions();
                this.props.resetCurrentLotDescriptionCreated();
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

        this.props.createClassStreams(payload);
        this.props.toggleAdminModalDisplay(false);
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Lot Descriptions</h3>
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
                                                name="lotDescription"
                                                className={
                                                    this.state.lotDescriptionHassError
                                                        ? "form-control personal__text-area-error"
                                                        : "form-control"
                                                }
                                                placeholder="Lot description"
                                                value={this.state.lotDescription}
                                                type="text"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
                                            <p
                                                className={
                                                    this.state.lotDescriptionHassError
                                                        ? "personal__submision-error"
                                                        : "personal__hide"
                                                }
                                            >
                                                {this.state.lotDescriptionErrorMessage}
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

LotDescriptionForm.propTypes = {
    createClassStreams: PropTypes.func.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    fetchAllLotDescriptions: PropTypes.func.isRequired,
    isCurrentLotDescriptionCreated: PropTypes.bool.isRequired,
    resetCurrentLotDescriptionCreated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isCurrentLotDescriptionCreated:
    state.admin_home.lotDescriptions.isCurrentLotDescriptionCreated
});

const mapDispatchToProps = dispatch => ({
    createClassStreams: payload => dispatch(createClassStreams(payload)),
    toggleAdminModalDisplay: isAdminModalDisplayed =>
        dispatch(toggleAdminModalDisplay(isAdminModalDisplayed)),
    fetchAllLotDescriptions: () => dispatch(fetchAllLotDescriptions()),
    resetCurrentLotDescriptionCreated: () =>
        dispatch(resetCurrentLotDescriptionCreated())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LotDescriptionForm);
