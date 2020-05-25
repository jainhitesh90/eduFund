import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import CustomButton from './custom-button';
import { isNil } from 'lodash';

export default class CustomModal extends Component {
  render() {
    const { showModal, className, title, body, modalSize } = this.props;
    return (
      <Modal size={modalSize ||  'lg'} isOpen={showModal} className={className}>
        <ModalHeader style={{ margin: 'auto' }}>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        {this.renderFooter()}
      </Modal>
    );
  }

  renderFooter() {
    const { onClick, onCancel, actionButtonText } = this.props;
    if (isNil(onCancel) && isNil(onClick)) {
      return null;
    } else {
      return <ModalFooter>
        {
          isNil(onCancel) ? null : <CustomButton
            label={'Cancel'}
            onClick={onCancel}
            color={"secondary"}
          />
        }
        {
          isNil(onClick) ? null : <CustomButton
            label={actionButtonText}
            onClick={onClick}
            color={"primary"}
          />
        }
      </ModalFooter>
    }
  }
}