import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.reference = React.createRef();
  }

  render() {
    const { id, label, type } = this.props;
    return (
      <TextField
        inputRef={this.reference}
        id={id}
        label={label}
        type={type || 'text'}
        variant="outlined" />
    );
  }
}