import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CustomError from './custom-error';

const MyInput = styled(TextField)({
  border: 0,
  borderRadius: 4,
  height: 48,
  marginTop: '20px'
});

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.reference = React.createRef();
  }

  render() {
    const { id, label, type, errorMessage } = this.props;
    return (
      <div>
        <MyInput
          inputRef={this.reference}
          id={id}
          label={label}
          type={type || 'text'}
          variant="outlined" />
        <CustomError errorMessage={errorMessage} />
      </div>
    );
  }
}