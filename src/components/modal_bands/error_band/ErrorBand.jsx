import React, {Component} from 'react';
import PropTypes from "prop-types";

import './ErrorBand.scss';

class ErrorBand extends Component {

    render() {
        const {
            mainBodyHeight,
            title
        } = this.props;
        return (
            <div className="error-band__main-body" style={{height: mainBodyHeight}}>
                {title}
            </div>
        );
    }
}

ErrorBand.prototypes = {
    mainBodyHeight: PropTypes.string,
    title: PropTypes.string
};

ErrorBand.defaultProps = {
    mainBodyHeight: "60px",
    title: "band"
};

export default ErrorBand;
