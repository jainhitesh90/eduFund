import React, { Component } from 'react';
import { Label} from 'reactstrap';
import {isEmpty} from 'lodash';

export default class CustomError extends Component {
  render() {
    const { errorMessage } = this.props;
    if (isEmpty(errorMessage)) {
      return null;
    } else {
      return (
        <div>
          <Label style={{color: 'red'}}>{errorMessage}</Label>
        </div>
      );
    }
  }
}