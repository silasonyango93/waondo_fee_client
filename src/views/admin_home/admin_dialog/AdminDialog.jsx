import React, { Component } from "react";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./AdminDialog.scss";
import { toggleAdminModalDisplay } from "../../../store/modules/admin_home/actions";
import ClassLevelForm from "../academic_class_configuration/class_levels/ClassLevelForm";

class AdminDialog extends Component {
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

          <div
            className={
              this.props.isAcademicClassLevelFormDisplayed ? "show" : "hide"
            }
          >
            <ClassLevelForm />
          </div>
        </Modal>
      </div>
    );
  }
}

AdminDialog.propTypes = {
  dialogHeight: PropTypes.string.isRequired,
  dialogWidth: PropTypes.string.isRequired,
  isAdminModalDisplayed: PropTypes.bool.isRequired,
  toggleAdminModalDisplay: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  isAcademicClassLevelFormDisplayed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  dialogHeight: state.admin_home.dialogHeight,
  dialogWidth: state.admin_home.dialogWidth,
  modalTitle: state.admin_home.modalTitle,
  isAdminModalDisplayed: state.admin_home.isAdminModalDisplayed,
  isAcademicClassLevelFormDisplayed:
    state.admin_home.isAcademicClassLevelFormDisplayed
});

const mapDispatchToProps = dispatch => ({
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDialog);
