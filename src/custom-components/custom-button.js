import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class CustomButton extends Component {
  render() {
    const { id, label, onClick, color } = this.props;
    return (
      <Button onClick={onClick}
        id={id}
        color={color}
      >{label}
      </Button>
    );
  }
}