import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class CustomButton extends Component {
  render() {
    const { id, label, onClick, color, style } = this.props;
    return (
      <Button
        style={style}
        onClick={onClick}
        id={id}
        color={color}
      >{label}
      </Button>
    );
  }
}