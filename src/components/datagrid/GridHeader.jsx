import React from 'react';
import GridColumn from "./GridColumn"
import GridRow from './GridRow'

export default function GridHeader(props) {
    return(
        // <div className={props.headerClass} style={{
        //     gridTemplateColumns: `40px repeat(${props.columns.length-1}, auto)`
        // }}>{
            props.rowData.map((d, i) => <GridColumn role="columnheader" sort={props.sort} key={i} field={d.field}/>)
        // }</div>  
    );
}; 