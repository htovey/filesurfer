import React, { useState } from'react';
import {FormControl, InputLabel, MenuItem, Select}  from '@mui/material';

import '../../App.css';

export default function StandardDropdown (props) {

  // const getSelectList = () => {
  //   if (props.listType === 'DATA') {
  //     return props.selectList.map(i => {
  //       return <MenuItem name={i.id} key={i.id} value={i.id}>{i.name}</MenuItem>
  //     });
  //   } else if (props.listType === 'ENUM') {
  //       return props.selectList.map(type => {
  //         return <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
  //       });
  //   } else {
  //     return props.selectList;
  //   }
  // };
  return(
    <FormControl>
      <InputLabel variant='outlined' id={props.inputLabelId} htmlFor={props.selectId}>{props.selectLabel}</InputLabel>
      <Select
        id={props.selectId}
        label={props.inputLabelId}
        value={props.value}
        onMouseDown={props.shrink}
        onChange={props.handleSelect}
        variant="outlined"
      >
      {props.selectList}
      </Select>
    </FormControl>
  );

}