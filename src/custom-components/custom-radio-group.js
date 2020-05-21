import React, { Component } from 'react';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CustomError from './custom-error';

const MyLabel = styled(FormLabel)({
  marginTop: '20px'
});

export default class CustomRadioGroup extends Component {
  render() {
    const { id, label, onChange, values, errorMessage } = this.props;
    return (
      <div>
        <MyLabel component="legend">{label}</MyLabel>
        <RadioGroup id={id} name={id} onChange={onChange}>
          {
            (values || []).map(function (item) {
              return <FormControlLabel value={item.key} control={<Radio />} label={item.value} />
            })
          }
        </RadioGroup>
        <CustomError errorMessage={errorMessage} />
      </div>
    );
  }
}