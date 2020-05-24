import React, { Component } from 'react';
import CustomError from './custom-error';
import { Input, Label } from 'reactstrap';

export default class CustomDropDown extends Component {
  render() {
    const { id, label, onChange, values, errorMessage, mandatory } = this.props;
    return (
      <div style={{ marginTop: '10px' }}>
        <Label style={{margin: 0}}>{label} {mandatory ? <sup style={{color: 'red'}}>*</sup> : null}</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={(e) => onChange(id, values[e.target.selectedIndex].key)}>
          {
            (values || []).map(function (item) {
              return <option>{item.value}</option>
            })
          }
        </Input>
        <CustomError errorMessage={errorMessage} />
     </div>
    );
  }
}