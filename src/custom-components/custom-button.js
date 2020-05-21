import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class CustomButton extends Component {
  render() {
    const { id, label, onClick, color } = this.props;
    return (
      <Button onClick={onClick}
        id={id}
        variant="contained"
        color={color}>
        {label}
      </Button>
    );
  }
}