import React, {Component} from 'react';
import PropTypes from "prop-types";

import './CheckBox.scss';

class CheckBox extends Component {
    state = {
        isChecked: false
    };

    componentDidMount() {
        this.setState({isChecked: this.props.isCheckBoxChecked});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {
            handleCheckBoxIsChecked,
            handleCheckBoxIsUnchecked,
            checkBoxObject
        } = this.props;

        const {
            isChecked
        } = this.state;

        if(isChecked !== prevState.isChecked) {
            if(isChecked) {
                handleCheckBoxIsChecked(checkBoxObject);
            } else {
                handleCheckBoxIsUnchecked(checkBoxObject);
            }
        }

        if(this.props.isCheckBoxChecked !== prevProps.isCheckBoxChecked) {
            this.setState({isChecked: this.props.isCheckBoxChecked});
        }
    }

    handleCheckBoxClicked = () =>{
        this.setState({isChecked: !this.state.isChecked});
    };

    render() {
        const {
            label
        } = this.props;

        const {
            isChecked
        } = this.state;
        return (
            <div>
                <input type="checkbox" name="checkBox" value="Bike" checked={isChecked} onClick={this.handleCheckBoxClicked}/>
                <label className="checkbox__label" htmlFor="checkBox">{label}</label><br />
            </div>
        );
    }
}

CheckBox.propTypes = {
    label: PropTypes.string,
    handleCheckBoxIsChecked: PropTypes.func,
    handleCheckBoxIsUnchecked: PropTypes.func,
    checkBoxObject: PropTypes.func,
    isCheckBoxChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
    label: 'CheckBox label',
    handleCheckBoxIsChecked: () =>{},
    handleCheckBoxIsUnchecked: () =>{},
    checkBoxObject: {},
    isCheckBoxChecked: false
};


export default CheckBox;
