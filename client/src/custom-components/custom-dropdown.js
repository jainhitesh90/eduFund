import React, { Component } from 'react';
import CustomError from './custom-error';
import { Input, Label } from 'reactstrap';
import {isNil} from 'lodash';

export default class CustomDropDown extends Component {
  render() {
    const { id, label, onChange, values, errorMessage, mandatory, errorOutline, defaultValueKey } = this.props;
    let defaultValue = values.find(o => o.key === defaultValueKey)
    return (
      <div style={{marginTop: '10px'}}>
        <Label style={{ margin: 0 }}>{label} {mandatory ? <sup style={{ color: 'red' }}>*</sup> : null}</Label>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          defaultValue={!isNil(defaultValue) ? defaultValue.value : null}
          style={errorOutline ? { border: '1px solid red' } : {}}
          onChange={(e) => onChange(id, values[e.target.selectedIndex].key)}>
          {
            (values || []).map(function (item, index) {
              return <option key={index}>{item.value}</option>
            })
          }
        </Input>
        <CustomError errorMessage={errorMessage} />
      </div>
    );
  }
}