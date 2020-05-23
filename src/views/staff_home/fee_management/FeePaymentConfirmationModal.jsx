import React, {Component} from 'react';

import { Columns, Container } from "react-bulma-components";

import PropTypes from "prop-types";
import './FeePaymentConfirmationModal.scss';
import GhostButton from "../../../components/buttons/ghost_buttons/GhostButton";

class FeePaymentConfirmationModal extends Component {
    render() {
        return (
            <div>
                <div className="payment__personal-info-div">
                    <div className="payment__details-inner-div">
                    <div className="payment__pic-circular-div"></div>
                    <div className="payment__student-name">Silas Onyango</div>
                        <div className="payment__admission-no">Admission No: 8032</div>
                    </div>
                </div>
                <div className="payment__prompt-div">
                    <div className="payment__prompt">
                        Would you like to register a fee installment of KES 30,000 to the named student?
                    </div>
                    <div className="payment__button-div">

                        <Columns>
                            <Columns.Column size="one-half">
                        <GhostButton />
                            </Columns.Column>

                            <Columns.Column size="one-half">
                                <div style={{float: 'right',marginRight: '2.5rem'}}>
                                <GhostButton />
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
    feePayload: PropTypes.object.isRequired
};

export default FeePaymentConfirmationModal;
