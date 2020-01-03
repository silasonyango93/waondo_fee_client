import React, { Component } from "react";
import Modal from "react-awesome-modal";
import SuccessTick from "../../../assets/success-tick.png";

class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.openModal();
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="success-modal-header">
            <p className="modal-title">Success</p>
          </div>
          <div className="modal-content-wrapper">
            <img className="success-tick" src={SuccessTick} alt="Success" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default SuccessModal;
