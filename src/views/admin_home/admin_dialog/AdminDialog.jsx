import React, { Component } from "react";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./AdminDialog.scss";
import { toggleAdminModalDisplay } from "../../../store/modules/admin_home/actions";
import ClassLevelForm from "../academic_class_configuration/class_levels/ClassLevelForm";
import ClassStreamsForm from "../academic_class_configuration/class_streams/ClassStreamForm";
import TermIterationForm from "../calendar/term_iteration/TermIterationForm";
import WeekIterationForm from "../calendar/week_iteration/WeekIterationForm";
import ActualTermsForm from "../calendar/actual_terms/ActualTermsForm";
import ActualWeeksForm from "../calendar/actual_weeks/ActualWeeksForm";

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

          <div
            className={this.props.isClassStreamFormDisplayed ? "show" : "hide"}
          >
            <ClassStreamsForm />
          </div>

          <div
            className={
              this.props.isTermIterationsFormDisplayed ? "show" : "hide"
            }
          >
            <TermIterationForm />
          </div>

          <div
            className={
              this.props.isWeekIterationsFormDisplayed ? "show" : "hide"
            }
          >
            <WeekIterationForm />
          </div>

          <div
            className={this.props.isActualTermsFormDisplayed ? "show" : "hide"}
          >
            <ActualTermsForm />
          </div>

          <div
            className={this.props.isActualWeeksFormDisplayed ? "show" : "hide"}
          >
            <ActualWeeksForm />
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
  isAcademicClassLevelFormDisplayed: PropTypes.bool.isRequired,
  isClassStreamFormDisplayed: PropTypes.bool.isRequired,
  isTermIterationsFormDisplayed: PropTypes.bool.isRequired,
  isWeekIterationsFormDisplayed: PropTypes.bool.isRequired,
  isActualTermsFormDisplayed: PropTypes.bool.isRequired,
  isActualWeeksFormDisplayed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  dialogHeight: state.admin_home.dialogHeight,
  dialogWidth: state.admin_home.dialogWidth,
  modalTitle: state.admin_home.modalTitle,
  isAdminModalDisplayed: state.admin_home.isAdminModalDisplayed,
  isAcademicClassLevelFormDisplayed:
    state.admin_home.isAcademicClassLevelFormDisplayed,
  isClassStreamFormDisplayed:
    state.admin_home.classStreams.isClassStreamFormDisplayed,
  isTermIterationsFormDisplayed:
    state.admin_home.termIterations.isTermIterationsFormDisplayed,
  isWeekIterationsFormDisplayed:
    state.admin_home.weekIterations.isWeekIterationsFormDisplayed,
  isActualTermsFormDisplayed:
    state.admin_home.actualTerms.isActualTermsFormDisplayed,
  isActualWeeksFormDisplayed:
    state.admin_home.actualWeeks.isActualWeeksFormDisplayed
});

const mapDispatchToProps = dispatch => ({
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDialog);
