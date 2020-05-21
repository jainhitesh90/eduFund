import React, { Component } from 'react';
import { FormLabel} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {isEmpty} from 'lodash';

const MyLabel = styled(FormLabel)({
  marginTop: '20px',
  marginBottom: '20px',
  color: 'red'
});

export default class CustomError extends Component {
  render() {
    const { errorMessage } = this.props;
    if (isEmpty(errorMessage)) {
      return null;
    } else {
      return (
        <div>
          <MyLabel>{errorMessage}</MyLabel>
        </div>
      );
    }
  }
}