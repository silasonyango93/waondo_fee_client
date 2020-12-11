import React, {Component} from 'react';
import {Columns} from "react-bulma-components/dist";
import PropTypes from "prop-types";
import {promiselessJsonTransactionsServicePost} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";

class EditFeeBreakDownModal extends Component {
    state = {
        feeAmount: ''
    };

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {classFeeStructureBreakDownId} = this.props;
        const {feeAmount} = this.state;
        const payload = {
            requestedChanges: [
                {
                    classFeeStructureBreakDownId: classFeeStructureBreakDownId,
                    feeAmount: feeAmount
                }
            ]
        };

        const apiResponse = await promiselessJsonTransactionsServicePost(payload,"/fee_structure/edit_a_fee_structure");
        if (apiResponse.status === 200) {
            this.props.closeModal();
        }
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Edit Fee BreakDown</h3>
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
                                                name="feeAmount"
                                                className="form-control"
                                                placeholder={this.props.initialFeeAmount}
                                                value={this.state.feeAmount}
                                                type="number"
                                                onChange={this.handleChange}
                                                autoFocus
                                                required={true}
                                            />
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

EditFeeBreakDownModal.propTypes = {
    classFeeStructureBreakDownId: PropTypes.string.isRequired,
    initialFeeAmount: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default EditFeeBreakDownModal;
