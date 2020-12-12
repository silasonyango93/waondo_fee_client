import React, {Component} from 'react';
import {Columns} from "react-bulma-components/dist";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {transactionsServicePost} from "../../../../services/transactions_service_connector/TransactionsServiceConnector";
import {fetchAllFeeStructures, setupFeeStructuresForm} from "../../../../store/modules/admin_home/actions";

class DuplicateFeeStructureModal extends Component {

    state = {
        description: ''
    };

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const {feeStructureId, userId} = this.props;
        const {description} = this.state;
        const payload = {
            feeStructureId: feeStructureId,
            userId: userId,
            duplicateFeeStructureName: description
        };
        const apiResponse = await transactionsServicePost(payload,"/fee_structure/duplicate_a_fee_structure");

        if (apiResponse.status === 200) {
            await this.props.fetchAllFeeStructures();
            this.props.closeModal();
        }
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default dialog__main-body">
                    <div className="panel-heading">
                        <h3 className="panel-title">Duplicate Fee Structure</h3>
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
                                                name="description"
                                                className="form-control"
                                                placeholder="Fee Structure Description"
                                                value={this.state.description}
                                                type="text"
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

DuplicateFeeStructureModal.propTypes = {
    feeStructureId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    fetchAllFeeStructures: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    fetchAllFeeStructures: () => dispatch(fetchAllFeeStructures())
});

export default connect(
    null,
    mapDispatchToProps
)(DuplicateFeeStructureModal);
