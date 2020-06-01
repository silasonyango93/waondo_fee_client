import React, { Component } from "react";
import { connect } from "react-redux";

import { Columns, Container } from "react-bulma-components";

import PropTypes from "prop-types";
import "./FeePaymentConfirmationModal.scss";
import GhostButton from "../../../components/buttons/ghost_buttons/GhostButton";
import { ip } from "../../../config/EndPoint";
import { currencyDisplay } from "../../../config/common/Utils";
import {payFee} from "../../../store/modules/staff_home/actions";

class FeePaymentConfirmationModal extends Component {

    handleSubmitButtonClicked = () => {
        const { feePayload } = this.props;
        const payload = {
            studentId: feePayload.studentId,
            installmentAmount: feePayload.installmentAmount,
            sessionLogId:
                this.props.sessionDetails &&
                this.props.sessionDetails.sessionLogsEntity &&
                this.props.sessionDetails.sessionLogsEntity.sessionLogId
                    ? this.props.sessionDetails.sessionLogsEntity.sessionLogId
                    : ""
        };

        this.props.payFee(payload);
        this.props.launchFeeStatementModal();
    };

  render() {
    const { feePayload } = this.props;

    return (
      <div>
        <div className="payment__personal-info-div">
          <div className="payment__details-inner-div">
            <img
              className="payment__pic-circular-div"
              src={ip + "/web_display_image?imageID=" + feePayload.profPicName}
            />
            <div className="payment__student-name">
              {feePayload.studentName}
            </div>
            <div className="payment__admission-no">
              Admission No: {feePayload.admissionNumber}
            </div>
          </div>
        </div>
        <div className="payment__prompt-div">
          <div className="payment__prompt">
            Would you like to register a fee installment of KES{" "}
            {currencyDisplay(feePayload.installmentAmount)} to the named
            student?
          </div>
          <div className="payment__button-div">
            <Columns>
              <Columns.Column size="one-half">
                <GhostButton text="Decline" onButtonClick={this.props.closeFeeConfirmationModal}/>
              </Columns.Column>

              <Columns.Column size="one-half">
                <div style={{ float: "right", marginRight: "2.5rem" }}>
                  <GhostButton text="Submit" onButtonClick={this.handleSubmitButtonClicked}/>
                </div>
              </Columns.Column>
            </Columns>
          </div>
        </div>
      </div>
    );
  }
}

FeePaymentConfirmationModal.propTypes = {
  feePayload: PropTypes.object.isRequired,
    payFee: PropTypes.func.isRequired,
    sessionDetails: PropTypes.object.isRequired,
    closeFeeConfirmationModal: PropTypes.func.isRequired,
    launchFeeStatementModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    sessionDetails: state.current_session.sessionDetails
});

const mapDispatchToProps = dispatch => ({
    payFee: payload => dispatch(payFee(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeePaymentConfirmationModal);
