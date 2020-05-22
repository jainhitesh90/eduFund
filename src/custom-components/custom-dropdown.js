import React, { Component } from 'react';
import CustomError from './custom-error';
import { FormGroup, Input, Label } from 'reactstrap';

export default class CustomDropDown extends Component {
  render() {
    const { id, label, onChange, values, errorMessage } = this.props;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={(e) => onChange(id, values[e.target.selectedIndex].key)}>
          {
            (values || []).map(function (item) {
              return <option>{item.value}</option>
            })
          }
        </Input>
        <CustomError errorMessage={errorMessage} />
      </FormGroup>
    );
  }
}