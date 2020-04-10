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
import LotDescriptionForm from "../academic_class_configuration/lot_description/LotDescriptionForm";
import ActualLotsForm from "../academic_class_configuration/actual_lots/ActualLotsForm";
import ActualClassesForm from "../academic_class_configuration/actual_classes/ActualClassesForm";
import UserRegistrationForm from "../system_user_management/system_user_registration/UserRegistrationForm";

class AdminDialog extends Component {
  state = {
    dialogWidth: "",
    dialogHeight: "",
    isAdminModalDisplayed: ""
  };

  componentDidMount() {
    this.setState({
      dialogWidth: this.props.dialogWidth,
      dialogHeight: this.props.dialogHeight,
      isAdminModalDisplayed: this.props.isAdminModalDisplayed
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.dialogWidth !== prevProps.dialogWidth ||
      this.props.dialogHeight !== prevProps.dialogHeight ||
      this.props.isAdminModalDisplayed !== prevProps.isAdminModalDisplayed
    ) {
      this.setState({
        dialogWidth: this.props.dialogWidth,
        dialogHeight: this.props.dialogHeight,
        isAdminModalDisplayed: this.props.isAdminModalDisplayed
      });
    }
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

          <div
            className={
              this.props.isLotDescriptionsFormDisplayed ? "show" : "hide"
            }
          >
            <LotDescriptionForm />
          </div>

          <div
            className={this.props.isActualLotsFormDisplayed ? "show" : "hide"}
          >
            <ActualLotsForm />
          </div>

          <div
              className={this.props.isActualClassesFormDisplayed ? "show" : "hide"}
          >
            <ActualClassesForm />
          </div>

          <div
              className={this.props.isUserRegistrationFormDisplayed ? "show" : "hide"}
          >
            <UserRegistrationForm />
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
  isActualWeeksFormDisplayed: PropTypes.bool.isRequired,
  isLotDescriptionsFormDisplayed: PropTypes.bool.isRequired,
  isActualLotsFormDisplayed: PropTypes.bool.isRequired,
  isActualClassesFormDisplayed: PropTypes.bool.isRequired,
  isUserRegistrationFormDisplayed: PropTypes.bool.isRequired
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
    state.admin_home.actualWeeks.isActualWeeksFormDisplayed,
  isLotDescriptionsFormDisplayed:
    state.admin_home.lotDescriptions.isLotDescriptionsFormDisplayed,
  isActualLotsFormDisplayed:
    state.admin_home.actualLots.isActualLotsFormDisplayed,
  isActualClassesFormDisplayed:
  state.admin_home.actualClasses.isActualClassesFormDisplayed,
  isUserRegistrationFormDisplayed:
  state.admin_home.userManagement.isUserRegistrationFormDisplayed
});

const mapDispatchToProps = dispatch => ({
  toggleAdminModalDisplay: isAdminModalDisplayed =>
    dispatch(toggleAdminModalDisplay(isAdminModalDisplayed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDialog);
