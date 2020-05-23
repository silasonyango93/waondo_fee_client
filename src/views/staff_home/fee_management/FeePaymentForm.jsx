import React, { Component } from "react";

import PropTypes from "prop-types";
import { Columns } from "react-bulma-components/dist";
import { connect } from "react-redux";
import {promiselessApiPost} from "../../../services/api_connector/ApiConnector";
import {today} from "../../../config/common/Utils";



class FeePaymentForm extends Component {
  state = {
    admissionNumber: "",
    admissionNumberHasError: false,
    admissionNumberErrorMessage: "",
    installmentAmount: 0,
    installmentAmountHasError: false,
    installmentAmountErrorMessage: ""
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

      if (this.state.installmentAmount < 1) {
          this.setState({
              installmentAmountHasError: true,
              installmentAmountErrorMessage: "Fee amount cannot be zero or negative"
          });
      } else if (this.state.installmentAmount > 40000) {
          this.setState({
              installmentAmountHasError: true,
              installmentAmountErrorMessage: "Fee amount cannot be more than KES 40,000"
          });
      } else {
          const payload = {
              column_name: 'AdmissionNo',
              search_value: this.state.admissionNumber
          };
          const responce = await promiselessApiPost(payload,"/get_specific_students");

          if(responce.data.results && !responce.data.results.length) {
              this.setState({
                  admissionNumberHasError: true,
                  admissionNumberErrorMessage: "No student exists by this admission number"
              });
          } else {


              const payload = {
                  studentId: responce.data.results[0].StudentId,
                  searchDate: today()
              };
              const feeResponce = await promiselessApiPost(payload,"/get_installment_paid_on_certain_date");

              if(feeResponce.data.results && feeResponce.data.results.length) {
                  this.setState({
                      admissionNumberHasError: true,
                      admissionNumberErrorMessage: "Cannot pay fee for the same student twice in a day"
                  });
              } else {
                  // All validation passes ---> Launch confirmation modal
                  const feePayload = {
                      studentId: responce.data.results[0].StudentId,
                      installmentAmount: this.state.installmentAmount,
                      studentName: responce.data.results[0].StudentName,
                      admissionNumber: responce.data.results[0].AdmissionNo,
                      profPicName: responce.data.results[0].ProfPicName
                  };

                  this.props.launchFeePaymentConfirmationModal(feePayload);
              }
          }
      }



  };



  render() {
    return (
      <div>
        <div className="login-panel panel panel-default dialog__main-body">
          <div className="panel-heading">
            <h3 className="panel-title">Fee Payment</h3>
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

                <Columns>
                  <Columns.Column size="one-half">
                    <div className="form-group">
                      <input
                        name="installmentAmount"
                        className={
                          this.state.installmentAmountHasError
                            ? "form-control personal__text-area-error"
                            : "form-control"
                        }
                        placeholder="Installment Amount"
                        value={this.state.installmentAmount}
                        type="number"
                        onChange={this.handleChange}
                        autoFocus
                        required={true}
                      />
                      <p
                        className={
                          this.state.installmentAmountHasError
                            ? "personal__submision-error"
                            : "personal__hide"
                        }
                      >
                        {this.state.installmentAmountErrorMessage}
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

FeePaymentForm.propTypes = {
  launchFeePaymentConfirmationModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // isCurrentActualTermCreated:
  //   state.admin_home.actualTerms.isCurrentActualTermCreated,
  // allTermIterations: state.admin_home.termIterations.allTermIterations,
  // allFeeStructures: state.admin_home.feeStructure.allFeeStructures,
  // allAcademicClassLevels: state.admin_home.allAcademicClassLevels
});

const mapDispatchToProps = dispatch => ({
    // terminateCurrentSession: payload => dispatch(terminateCurrentSession(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeePaymentForm);
