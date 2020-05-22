import React, { Component } from 'react';
import CustomModal from './custom-modal'

export default class CustomGlobalError extends Component {
  render() {
    const {errorMessage, showModal, className, onClick, okText } = this.props;
    return (
      <Modal isOpen={showModal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClick}>{okText}</Button>{' '}
          {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
    );
  }
}