import React from 'react';
import { Checkbox } from "@mui/material";
import GridColumn from "./GridColumn";
// import '../../App.css';

export default function GridRow(props) {
    const getFieldValue = (field) => {
        let value = props.rowData[field];
        if (field === 'checkbox') { 
            value = <input
                checked={props.rowData.checked}
                onChange={props.toggleRowSelection}
                value={props.rowData.id}
                type="checkbox"/>;
        } else if (field === 'theme') {
            let color = value;
            return <span className="color-chip-grid" style={{backgroundColor: color}}></span>
        }
        return value;
    }

    return(
        // <div style={{
        //     display: `grid`,
        //     gridTemplateColumns: `40px repeat(${props.columns.length-1}, auto)`
        // }}>{
            props.columns.map((c, i) => 
                <GridColumn 
                    field={getFieldValue(c.field)} 
                    role="gridcell"
                    sort={props.sort} 
                    key={parseInt(props.rowData.id)+i}
                    styles={props.columnClass}
                />
            )  
        // }</div>    
        
    );
};