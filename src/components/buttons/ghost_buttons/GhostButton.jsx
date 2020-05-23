import React, {Component} from 'react';
import PropTypes from "prop-types";

class GhostButton extends Component {
    render() {
        const {
            text
        } = this.props;

        const styleMainBody = {
            borderRadius: '6px',
            border: 'solid 1px #041333',
            width: '77px',
            height: '35px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };

        const styleText = {
            fontFamily: 'Lato',
            fontSize: '20px',
            fontWeight: '300',
        };

        return (
            <div style={styleMainBody}>
                <div style={styleText}>{text}</div>
            </div>
        );
    }
}

GhostButton.propTypes = {
    text: PropTypes.string,
    onButtonClick: PropTypes.func,
};

GhostButton.defaultProps = {
    text: 'Submit',
    onButtonClick: ()=>{}
};

export default GhostButton;
