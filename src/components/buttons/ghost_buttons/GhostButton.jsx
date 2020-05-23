import React, {Component} from 'react';
import PropTypes from "prop-types";

class GhostButton extends Component {
    render() {
        const {
            text,
            borderRadius,
            border,
            width,
            height
        } = this.props;

        const styleMainBody = {
            borderRadius: borderRadius,
            border: border,
            width: width,
            height: height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
        };

        const styleText = {
            fontFamily: 'Lato',
            fontSize: '20px',
            fontWeight: '300',
        };

        return (
            <div style={styleMainBody} onClick={()=>{this.props.onButtonClick()}}>
                <div style={styleText}>{text}</div>
            </div>
        );
    }
}

GhostButton.propTypes = {
    text: PropTypes.string,
    onButtonClick: PropTypes.func,
    borderRadius: PropTypes.string,
    border: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

GhostButton.defaultProps = {
    text: 'Submit',
    onButtonClick: ()=>{},
    borderRadius: '6px',
    border: 'solid 1px #041333',
    width: '77px',
    height: '35px',
};

export default GhostButton;
