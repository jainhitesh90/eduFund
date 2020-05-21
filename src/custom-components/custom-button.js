import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
  border: 0,
  borderRadius: 4,
  height: 48,
  padding: '0 30px',
  marginTop: '20px'
});

export default class CustomButton extends Component {
  render() {
    const { id, label, onClick, color } = this.props;
    return (
      <MyButton onClick={onClick}
        id={id}
        variant="contained"
        color={color}>
        {label}
      </MyButton>
    );
  }
}