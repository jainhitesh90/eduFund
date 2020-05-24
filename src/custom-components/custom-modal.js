import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import CustomButton from './custom-button';

export default class CustomModal extends Component {
  render() {
    const { onClick, onCancel, showModal, className, actionButtonText, title, body } = this.props;
    return (
      <Modal isOpen={showModal} className={className}>
        <ModalHeader style={{margin: 'auto'}}>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <CustomButton
            label={'Cancel'}
            onClick={onCancel}
            color={"secondary"}
          />
          <CustomButton
            label={actionButtonText}
            onClick={onClick}
            color={"primary"}
          />
        </ModalFooter>
      </Modal>
    );
  }
}