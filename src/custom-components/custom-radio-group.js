import React, { Component } from 'react';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default class CustomRadioGroup extends Component {
  render() {
    const { id, label, onChange, values } = this.props;
    return (
      <div>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup id={id} name={id} onChange={onChange}>
          {
            (values || []).map(function (item) {
              return <FormControlLabel value={item.key} control={<Radio />} label={item.value} />
            })
          }
        </RadioGroup>
      </div>
    );
  }
}