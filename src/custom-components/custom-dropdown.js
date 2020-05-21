import React, { Component } from 'react';
import { FormLabel, Select, MenuItem } from '@material-ui/core';

export default class CustomDropDown extends Component {
  render() {
    const { id, label, onChange, values } = this.props;
    return (
      <div>
        <FormLabel id={id}>{label}</FormLabel>
        <Select id={id} onChange={onChange}>
          {
            (values || []).map(function (item) {
              return <MenuItem value={item.key}>{item.value}</MenuItem>
            })
          }
        </Select>
      </div>
    );
  }
}