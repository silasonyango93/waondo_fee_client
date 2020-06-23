import React, { Component } from "react";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";

import successIcon from "../../../assets/success-tick.png";
import failureIcon from "../../../assets/failure.png";

class SuccessFailureModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };


  }

  componentDidMount() {
    this.openModal();
  }

  openModal = () => {
    this.setState({
      visible: true
    });
  }

  closeModal = () => {
    this.setState({
      visible: false
    });
    this.props.handleModalExteriorClicked();
  }

  render() {

    const { isASuccess, eventMessage } = this.props;

    return (
      <div>
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className={isASuccess ? "success-modal-header" : "failure-modal-header"}>
            <p className="modal-title">{isASuccess ? "Success" : "Failure"}</p>
          </div>
          <div className="modal-content-wrapper">
            <img className="success-tick" src={isASuccess ? successIcon : failureIcon} alt="Success" />
            {!isASuccess && (<p className="event-message">{eventMessage}</p>)}
          </div>
        </Modal>
      </div>
    );
  }
}

SuccessFailureModal.propTypes = {
  isASuccess: PropTypes.bool.isRequired,
  eventMessage: PropTypes.string.isRequired,
  handleModalExteriorClicked: PropTypes.string,
};

SuccessFailureModal.defaultProps = {
  isASuccess: true,
  eventMessage: 'Error message',
  handleModalExteriorClicked: ()=>{}
};

export default SuccessFailureModal;
