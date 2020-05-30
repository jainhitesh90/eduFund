import React, { Component } from 'react';
import CustomError from './custom-error';
import { FormGroup, Input, Label } from 'reactstrap';

export default class CustomRadioGroup extends Component {
  render() {
    const { id, label, onChange, values, errorMessage } = this.props;
    return (
      <FormGroup tag="fieldset" id={id} name={id} >
        <Label>{label}</Label>
          {
            (values || []).map(function (item) {
              return <FormGroup check>
              <Label check>
                <Input type="radio" name={id} onChange={() => onChange(id, item.key)}/>{' '}
                {item.value}
              </Label>
            </FormGroup>
            })
          }
          <CustomError errorMessage={errorMessage} />
      </FormGroup>
    );
  }
}