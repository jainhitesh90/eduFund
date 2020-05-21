import React, { Component } from 'react';
import { FormLabel, Select, MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CustomError from './custom-error';

const MyLabel = styled(FormLabel)({
  marginTop: '20px',
  paddingLeft: '5px'
});

const MySelect = styled(Select)({
  marginTop: '20px',
  width: '100%'
});

export default class CustomDropDown extends Component {
  render() {
    const { id, label, onChange, values, errorMessage } = this.props;
    return (
      <div>
        <MyLabel id={id}>{label}</MyLabel>
        <MySelect id={id} onChange={onChange}>
          {
            (values || []).map(function (item) {
              return <MenuItem value={item.key}>{item.value}</MenuItem>
            })
          }
        </MySelect>
        <CustomError errorMessage={errorMessage} />
      </div>
    );
  }
}