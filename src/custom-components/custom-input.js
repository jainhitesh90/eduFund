import React, { Component } from 'react';
import CustomError from './custom-error';
// import { InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import { InputGroup, Input, Label } from 'reactstrap';

const inputStyle = {
  border: 0,
  borderRadius: 4,
  height: 48
};

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.reference = React.createRef();
  }

  render() {
    const { id, label, type, errorMessage, placeholder } = this.props;
    return (
      <div style={{ marginTop: '10px' }}>
        <Label>{label}</Label>
        <InputGroup style={inputStyle}>
          {/* <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon> */}
          <Input
            innerRef={this.reference}
            id={id}
            type={type || 'text'}
            placeholder={placeholder} />
        </InputGroup>
        <CustomError errorMessage={errorMessage} />
      </div>
    );
  }
}