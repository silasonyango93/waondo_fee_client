import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ErrorPage.scss";
import ErrorIcon from "../../assets/error_icon.png";

class ErrorPage extends Component {
  render() {
    const {
      errorTitle,
      errorCode,
      errorResolution,
      buttonText,
      isButtonRequired
    } = this.props;
    return (
      <div className="error__main-body">
        <img className="error__error-icon" src={ErrorIcon} alt="Success" />
        <div className="error__error-title">{errorTitle}</div>
        <div className="error__error-code">{errorCode}</div>
        <div className="error__resolution">{errorResolution}</div>
        {isButtonRequired && <div className="error__button">{buttonText}</div>}
      </div>
    );
  }
}

ErrorPage.propTypes = {
  errorTitle: PropTypes.string,
  errorCode: PropTypes.string,
  errorResolution: PropTypes.string,
  buttonText: PropTypes.string,
  isButtonRequired: PropTypes.bool
};

ErrorPage.defaultProps = {
  errorTitle: "This system does not render on mobile",
  errorCode: "Error Code: N/A",
  errorResolution: "Kindly open the link on a computer/Laptop",
  buttonText: "Okay",
  isButtonRequired: false
};

export default ErrorPage;
