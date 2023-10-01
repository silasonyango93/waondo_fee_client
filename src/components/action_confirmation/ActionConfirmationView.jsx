import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Columns} from "react-bulma-components";
import GhostButton from "../buttons/ghost_buttons/GhostButton";

import './ActionConfirmationView.scss';

class ActionConfirmationView extends Component {
    render() {
        const {title, promptText} = this.props;
        return (
            <div className="confirm__main-div">
                <div className="confirm__title-div">
                    {title}
                </div>
                <div className="payment__prompt-div">
                    <div className="confirm__prompt-text">
                        {promptText}
                    </div>
                    <div className="payment__button-div">
                        <Columns>
                            <Columns.Column size="one-half">
                                <GhostButton text="Decline" onButtonClick={this.props.handleRejectButtonClicked}/>
                            </Columns.Column>

                            <Columns.Column size="one-half">
                                <div style={{float: "right", marginRight: "2.5rem"}}>
                                    <GhostButton text="Submit" onButtonClick={this.handleConfirmButtonClicked}/>
                                </div>
                            </Columns.Column>
                        </Columns>
                    </div>
                </div>
            </div>
        );
    }
}

ActionConfirmationView.propTypes = {
    title: PropTypes.string.isRequired,
    promptText: PropTypes.string.isRequired,
    handleConfirmButtonClicked: PropTypes.func.isRequired,
    handleRejectButtonClicked: PropTypes.func.isRequired
};

export default ActionConfirmationView;
