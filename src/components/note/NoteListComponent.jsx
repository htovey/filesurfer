import React, { useState } from 'react';
import DataGrid from '../datagrid/DataGrid';
import FetchUtil from "../../utils/FetchUtil.js";

export default function NoteListComponent(props) {
    const columns = [
        {
            field: "checkbox",
            headerName: ""
        },
        {
            field: "id",
            headerName: "Note Id",
            options: {
                display: 'excluded'
            }
        },
        {
            field: "directory",
            headerName: "Directory",
            options: {
                filter: true
            }
        },
        {
            field: "noteText",
            headerName: "Note",
            options: {
                filter: true,
                setCellProps: value => ({ style: { width: '75%' } }),
            }
        },
        {
            field: "lastUpdated",
            headerName: "Last Updated",
            options: {
                filter: true
            }
        }
    ];

    const headerRow = columns.map(c => {
        return {
            field: c.headerName,
            headerName: c.headerName
        }
    });

    const toolbarStyles = {
        backgroundColor: 'lightGray',
        marginLeft: '5px', 
        marginRight: '5px',
        marginTop: '10px',
        height: '75px'
    };  

    const searchStyles = {
        marginRight: 0,
        marginLeft: 'auto',
        marginTop: '5px',
        marginBottom: '5px',
        display: 'flex',
        backgroundColor: 'white',
        height: '50px'
    }

    const [selectedRows, setSelectedRows] = useState({data: []});


    ///// CRUD OPERATIONS ////
    const create = () => {
        props.setActionType('CREATE');
        props.setShowNoteForm(true);
    };

    const edit = (selectedRows) => {
        let note = selectedRows.data[0];
        props.getNoteFormData(note);
        props.setActionType('UPDATE');
        updateCheckbox(note.id);
        setSelectedRows({ data: [] });
    };

    const updateCheckbox = (id) => {
        props.noteList.map((g, i) => {
            if (g.id === id) {
                g.checked = !g.checked;
            }
        });
    };
    const getIdList = (selectedRows) => {
        let deleteArray = [];
        selectedRows.data.map((selected, index) => {
             deleteArray[index] = selected.id;
        });
        return deleteArray;
    }

    const deleteNotes = (selectedRows) => {
        handleDelete(selectedRows);
        setSelectedRows({ data: [] });
    }
  
    const handleDelete = (selectedRows) => {
        // this.setState({loading: true});
        var baseUrl = import.meta.env.VITE_API_URL || 'http://18.191.225.26:8181';
        var url = baseUrl+'/delete';
        var payload = getIdList(selectedRows)
        // eslint-disable-next-line no-unused-vars
       // props.setLoading(true);
        var result = FetchUtil.handlePost(url, props.userToken, payload)
        .then(response => {
            if (response.status === 200) {
                //this.setState({loading : false});
                console.log('Delete: Success***');
                props.handleSuccess('DELETE', 'ASSET');
                //resetRows();
            }
        })    
        .catch((error) => {
            console.log(error);
           // this.handleError('Delete failed. Please try again later.');
        });
    }

    const gridOptions = {
        searchStyles: searchStyles,
        toolbarStyles: toolbarStyles,
        cellClass: 'grid-cell',
        columnClass: 'grid-column',
        headerClass: 'column-header',
        rowClass: 'grid-row',
        add: create,
        edit: edit,
        delete: deleteNotes,
        customFunction1: props.openDirectoryForm,
        customFunction1Name: 'Load Local DirectoryList',
        editTooltip: 'Edit Note',
        deleteTooltip: 'Delete Note',
        addTooltip: 'Create Note',
        showLaunch: false,
        title: 'Notes'
    }

    return (
            <DataGrid  
                cellClass="grid-column grid-cell"
                checkboxClass="box"
                columnClass="grid-column"
                columns={columns}
                gridClass="container"
                handleSucces={props.handleSucces}
                headerClass="column-header"
                headerRowData={headerRow}
                noData={"no existing Notes"}
                gridOptions={gridOptions}
                rows={props.noteList}
                rowClass="grid-row"
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
            />

    )
}