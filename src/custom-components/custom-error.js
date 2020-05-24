import React, { Component } from 'react';
import { Label } from 'reactstrap';
import { isEmpty } from 'lodash';

export default class CustomError extends Component {
  render() {
    const { errorMessage } = this.props;
    const errorStyle = {
      margin: 'auto', color: 'red'
    }
    if (isEmpty(errorMessage)) {
      return null;
    } else {
      return (
        <div style={errorStyle}>
          <Label>{errorMessage}</Label>
        </div>
      );
    }
  }
}