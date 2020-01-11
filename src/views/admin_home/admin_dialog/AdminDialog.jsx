import React, { Component } from "react";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./AdminDialog.scss";
import {toggleAdminModalDisplay} from "../../../store/modules/admin_home/actions";

class AdminDialog extends Component {
    state = {
        displayPersonalDetails: false
    };

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }


    render() {
        return (
            <div>

                <Modal
                    visible={this.props.isAdminModalDisplayed}
                    width={this.props.dialogWidth}
                    height={this.props.dialogHeight}
                    effect="fadeInUp"
                    onClickAway={() => {
                        this.props.toggleAdminModalDisplay(false);
                    }}
                >
                    <div className="success-modal-header">
                        <p className="modal-title">{this.props.modalTitle}</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

AdminDialog.propTypes = {
    dialogHeight: PropTypes.string.isRequired,
    dialogWidth: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    toggleAdminModalDisplay: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    dialogHeight: state.admin_home.dialogHeight,
    dialogWidth: state.admin_home.dialogWidth,
    isAdminModalDisplayed: state.admin_home.isAdminModalDisplayed
});

const mapDispatchToProps = dispatch => ({
    toggleAdminModalDisplay: isAdminModalDisplayed => dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDialog);
