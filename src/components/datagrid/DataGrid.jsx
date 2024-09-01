import { Component } from 'react';
import * as React from 'react';
import CrudToolbar from './CrudToolbar';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import Utils from '../../utils/Utils';

class DataGrid extends Component {
    constructor(props, options) {
        super(props);
        this.state = {
            columns: props.columns,
            originalRows: props.rows,
        }
        this.options = {
            searchStyles: this.props.gridOptions.searchStyles,
            toolbarStyles: this.props.gridOptions.toolbarStyles,
            cellClass: this.props.gridOptions.cellClass,
            columnClass: this.props.gridOptions.columnClass,
            headerClass: this.props.gridOptions.headerClass,
            headerRow: this.props.gridOptions.headerRow,
            rowClass: this.props.gridOptions.rowClass,
            add: this.props.gridOptions.add,
            edit: this.editData,
            delete: this.deleteData,
            load: this.loadData,
            addTooltip: this.props.gridOptions.addTooltip,
            editTooltip: this.props.gridOptions.editTooltip,
            deleteTooltip: this.props.gridOptions.deleteTooltip,
            loadTooltip: this.props.gridOptions.loadTooltip,
            close: this.props.gridOptions.close,
            showLaunch: this.props.gridOptions.showLaunch,
            title: this.props.gridOptions.title,
        }
    }
    // crud button functions for toolbar
    editData = () => {
        this.props.gridOptions.edit(this.props.selectedRows);
    }
    deleteData = () => {
        this.props.gridOptions.delete(this.props.selectedRows);
    }
    loadData = () => {
        this.props.gridOptions.load(this.props.selectedRows);
    }

    sort = (e) => {
        let sortBy = e.target.attributes.value.value;
        let sortedRows = this.props.rows;
        sortedRows.sort((a, b) => {
            var one = a[sortBy];
            var two = b[sortBy];
            return one.localeCompare(two);
        });
        this.setState({rows: sortedRows});
    };

    search = (input) => {
        console.log('SEARCH INPUT: '+input);
        let result = this.props.rows.filter((row) => Utils.isSubString(input, row.name));
        this.setState({rows: result});
    };

    clearSearch = () => {
        this.setState({rows: this.state.originalRows});
    }

    toggleRowSelection = (e) => {
        let rowList = this.props.selectedRows.data;
        const key = e.target.value;
        const row = this.props.rows.find(r => r.id === key)
        row.checked = !row.checked;
        if (rowList.find(r => r.id === key)) {
            rowList = rowList.filter(r => r.id !== key);
        } else {
            rowList.push(row);
        }
        this.props.setSelectedRows({data: rowList});
    };


    render() {
        let multiSelect = this.props.selectedRows.data.length > 1;
        let rowSelected = this.props.selectedRows.data.length === 1;
        return (
            <div>
                <CrudToolbar 
                    multiSelect={multiSelect}
                    rowSelected={rowSelected}
                    options={this.options}
                    alert={this.alert}
                    useSearch="true"
                    search={this.search}
                    clearSearch={this.clearSearch}
                    overrideLaunch={this.props.overrideLaunch}
                />
                <div role="grid" style={{gridTemplateColumns: `40px repeat(${this.props.columns.length-1}, auto)`}}>
                    <GridHeader 
                        headerClass={this.props.gridOptions.headerRow}
                        headerColumnClass={this.props.gridOptions.headerColumn} 
                        rowData={this.props.headerRowData} 
                        sort={this.sort}
                        columns={this.state.columns}
                    >
                    </GridHeader>
                    {this.props.rows.length > 0 &&
                    this.props.rows.map((r, i) => 
                        <GridRow 
                            checked={r.checked}
                            options={this.options}
                            columnClass={this.props.columnClass}
                            columns={this.state.columns}
                            key={parseInt(r.id)} 
                            rowData={r}
                            toggleRowSelection={this.toggleRowSelection}
                        />
                    )}
                </div>
                {this.props.rows.length === 0 &&
                    <div className="no-data">{this.props.noData}</div>
                }
            </div>
            
        )
    }
}

export default DataGrid;