import React, { Component } from "react";
import { Columns } from "react-bulma-components/dist";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./ChangeResidencePage.scss";
import { promiselessApiPost } from "../../../services/api_connector/ApiConnector";
import { promiselessTransactionsServicePost } from "../../../services/transactions_service_connector/TransactionsServiceConnector";
import ErrorBand from "../../../components/modal_bands/error_band/ErrorBand";
import {
  fetchAllStudents
} from "../../../store/modules/staff_home/actions";

class ChangeResidencePage extends Component {
  state = {
    admissionNumber: "",
    admissionNumberHasError: false,
    admissionNumberErrorMessage: "",
    displayChangeResidenceForm: true,
    displayEligibilityRevoked: false,
    eligibilityMessage: "",
    displayResidenceSwapConfirmationModal: false,
    confirmationData: ""
  };

  handleChange = event => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState({
      ...newState
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const payload = {
      column_name: "AdmissionNo",
      search_value: this.state.admissionNumber
    };
    const response = await promiselessApiPost(
      payload,
      "/get_specific_students"
    );

    if (response.data.results && !response.data.results.length) {
      this.setState({
        admissionNumberHasError: true,
        admissionNumberErrorMessage:
          "No student exists by this admission number"
      });
    } else {
      const payload = {
        admissionNo: this.state.admissionNumber
      };

      const response = await promiselessTransactionsServicePost(
        payload,
        "/change_student_residence/confirm_residence_swap"
      );
      if (!response.data.periodEligible) {
        this.setState({
          displayChangeResidenceForm: false,
          displayEligibilityRevoked: true,
          displayResidenceSwapConfirmationModal: false,
          eligibilityMessage: response.data.eligibilityMessage
        });
      } else {
        this.setState({
          displayChangeResidenceForm: false,
          displayEligibilityRevoked: false,
          displayResidenceSwapConfirmationModal: true,
          confirmationData: response.data
        });
      }
    }
  };

  renderChangeResidenceForm = () => {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Change Student Residence</h3>
          </div>
          <div className="panel-body">
            <form
              action=""
              method="POST"
              onSubmit={this.handleFormSubmit}
              encType="multipart/form-data"
            >
              <fieldset>
                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <input
                        name="admissionNumber"
                        className={
                          this.state.admissionNumberHasError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Admission Number"
                        value={this.state.admissionNumber}
                        type="number"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.admissionNumberHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.admissionNumberErrorMessage}
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
  };

  renderEligibilityRevokedModal = () => {
    const { eligibilityMessage } = this.state;
    return (
      <div>
        <ErrorBand title="Request revoked" />
        <div className="residence-page__modal-body">{eligibilityMessage}</div>
      </div>
    );
  };

  renderResidenceSwapConfirmationModal = () => {
    const { confirmationData } = this.state;
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <Columns>
              <Columns.Column size="three-quarter">
                <div>Confirm Change Residence</div>
              </Columns.Column>
            </Columns>
          </div>
          <div className="panel-body">
            <table
              width="100%"
              className="table table-striped table-bordered table-hover"
              id="dataTables-example"
            >
              <tr>
                <th>Admission Number</th>
                <td>{confirmationData.admissionNumber}</td>
              </tr>
              <tr>
                <th>Current Residence</th>
                <td>
                  {confirmationData.currentResidenceCode === 1
                    ? "Boarder"
                    : "Day Scholar"}
                </td>
              </tr>
              <tr>
                <th>Next Residence</th>
                <td>
                  {confirmationData.proposedResidenceCode === 1
                    ? "Boarder"
                    : "Day Scholar"}
                </td>
              </tr>
              <tr>
                <th>Current Term Balance</th>
                <td>{confirmationData.currentTermBalance}</td>
              </tr>
              <tr>
                <th>Next Term Balance</th>
                <td>{confirmationData.expectedTermBalance}</td>
              </tr>
              <tr>
                <th>Current Annual Balance</th>
                <td>{confirmationData.currentAnnualBalance}</td>
              </tr>
              <tr>
                <th>Next Annual Balance</th>
                <td>{confirmationData.expectedAnnualBalance}</td>
              </tr>
              <tr>
                <th>Change Residence Charge</th>
                <td>{confirmationData.changeExtraCharge}</td>
              </tr>
            </table>
          </div>
        </div>
        <Columns>
          <Columns.Column size="one-half">
            <button
              type="submit"
              className="btn btn-lg btn-success btn-block residence-page__cancel-button"
              onClick={() => {
                this.handleCancelButtonIsClicked();
              }}
            >
              Cancel
            </button>
          </Columns.Column>
          <Columns.Column size="one-half">
            <button
              type="submit"
              className="btn btn-lg btn-success btn-block residence-page__submit-button"
              onClick={() => {
                this.handleConfirmButtonIsClicked(confirmationData);
              }}
            >
              Confirm
            </button>
          </Columns.Column>
        </Columns>
      </div>
    );
  };

  handleCancelButtonIsClicked = () => {
    this.setState({
      displayChangeResidenceForm: true,
      displayEligibilityRevoked: false,
      displayResidenceSwapConfirmationModal: false
    });
  };

  handleConfirmButtonIsClicked = async confirmationData => {
    const payload = {
      admissionNumber: confirmationData.admissionNumber,
      currentResidenceCode: confirmationData.currentResidenceCode,
      proposedResidenceCode: confirmationData.proposedResidenceCode,
      currentTermBalance: confirmationData.currentTermBalance,
      currentAnnualBalance: confirmationData.currentAnnualBalance,
      expectedTermBalance: confirmationData.expectedTermBalance,
      expectedAnnualBalance: confirmationData.expectedAnnualBalance,
      changeExtraCharge: confirmationData.changeExtraCharge,
      sessionLogId: this.props.sessionLogId
    };

    const apiResponse = await promiselessTransactionsServicePost(
      payload,
      "/change_student_residence/execute_residence_swap"
    );
    if (apiResponse.status === 200) {
      this.props.fetchAllStudents();
      this.props.closeModal();
      this.setState({
          displayChangeResidenceForm: true,
          displayEligibilityRevoked: false,
          displayResidenceSwapConfirmationModal: false,
      })
    }
  };

  render() {
    const {
      displayChangeResidenceForm,
      displayEligibilityRevoked,
      displayResidenceSwapConfirmationModal
    } = this.state;
    return (
      <div>
        {displayChangeResidenceForm && this.renderChangeResidenceForm()}
        {displayEligibilityRevoked && this.renderEligibilityRevokedModal()}
        {displayResidenceSwapConfirmationModal &&
          this.renderResidenceSwapConfirmationModal()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllStudents: () => dispatch(fetchAllStudents())
});

ChangeResidencePage.propTypes = {
  sessionLogId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchAllStudents: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(ChangeResidencePage);
