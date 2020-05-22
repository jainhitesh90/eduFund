import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export default class CustomModal extends Component {
  render() {
    const {onClick, showModal, className, onClick, okText } = this.props;
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