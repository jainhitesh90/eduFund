import React, { Component } from 'react';
import { Label } from 'reactstrap';
import { isEmpty } from 'lodash';

export default class CustomError extends Component {
  render() {
    const { errorMessage, style } = this.props;
    if (isEmpty(errorMessage)) {
      return null;
    } else {
      return (
        <Label className={'error-mssage'} style={style}>{errorMessage}</Label>
      );
    }
  }
}