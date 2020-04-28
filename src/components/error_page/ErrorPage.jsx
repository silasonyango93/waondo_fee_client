import React, {Component} from 'react';

import './ErrorPage.scss';
import ErrorIcon from "../../assets/error_icon.png";

class ErrorPage extends Component {
    render() {
        return (
            <div className="error__main-body">
                <img className="error__error-icon" src={ErrorIcon} alt="Success" />
                <div className="error__error-title">This system does not render on mobile</div>
                <div className="error__error-code">Error Code: N/A</div>
                <div className="error__resolution">Kindly open the link on a computer/Laptop</div>
                <div className="error__button">Okay</div>
            </div>
        );
    }
}

export default ErrorPage;
