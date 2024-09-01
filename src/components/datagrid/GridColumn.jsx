import React from 'react';

export default function GridColumn(props) {
    let displayVal = props.field; 
    // if (props.field === 'checkbox') {
    //     displayVal = <input type="checkbox"/>;
    // } else 
    if (props.field === 'checkbox') {
        displayVal = '';
    }

    //let columnClass = props.checkboxSelection ? props.checkboxClass : props.columnClass
    
    return (
        // <grid-template-column onClick={props.sort}>{displayVal}</grid-template-column>
        <span role={props.role} onClick={props.sort}>{displayVal}</span>
    )
};