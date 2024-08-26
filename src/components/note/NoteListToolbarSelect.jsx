import React, {Component} from 'react';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FetchUtil from '../../utils/FetchUtil';
import NoteComponent from './NoteComponent';
import CircularProgress from '@mui/material/CircularProgress';


const defaultToolbarSelectStyles = {
    iconButton: {
      marginRight: "24px",
      top: "40%",
      transform: "translateY(-50%)"
    },
    deleteIcon: {
      color: "#000"
    },
    editIcon: {
        color: "#000"
    },
    divHeight: {
        height: "40px"
    }
  };
  

class NoteListToolbarSelect extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading: false
        }
    }

    handleDelete = () => {
        this.setState({loading: true});
        const baseUrl = process.env.REACT_APP_API_URL || 'http://18.191.225.26:8181';
        var url = baseUrl+"/delete";
        var body = this.getNoteIdList(this.props.selectedRows)
        var result = FetchUtil.handlePost(url, this.props.userToken, body)
        .then(response => {
            if (response.status === 200) {
                this.setState({loading : false});
                console.log("Delete: Success***");
                this.props.handleSuccess("delete");
                this.resetRows();
            }
        })
         
        .catch((error) => {
            console.log(error);
           // this.handleError('Delete failed. Please try again later.');
        });
    }

    editNote = () => {
        var updateNote = this.props.noteList[this.props.selectedRows.data[0].index];
        this.props.getNoteFormData(updateNote);
    }

    getNoteIdList = (selectedRows) => {
        var deleteArray = [];
        selectedRows.data.map((selectedNote, index) => {
             var note =  this.props.noteList[selectedNote.index];
             deleteArray[index] = note.noteId;
        });
        return deleteArray;
    }

    getNotePayload = (note) => {
        var updateNote = [];
        updateNote.noteId = note.noteId;
        updateNote.category = note.category;
        updateNote.noteText = note.noteText;
        return updateNote;
    }

    resetRows = () => {
        this.props.setSelectedRows([]);
    //    this.setState({selectedRows: { data : []}});
    }

    render() {
        const { classes } = this.props;
        const multiSelect = this.props.selectedRows.data.length > 1;
     
        return (
            <div className={classes.divHeight} onChange={alert}>
                {this.state.loading && <CircularProgress/>} 
                <Tooltip title={"Edit"}>
                    <IconButton className={classes.iconButton} disabled={multiSelect} onClick={this.editNote}>
                        {!multiSelect && <EditIcon className={classes.editIcon} />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                    <IconButton className={classes.iconButton} onClick={this.handleDelete}>
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                {this.props.openNote && <NoteComponent 
                    openNote={true} 
                    noteModel={this.updateNote}
                    className="note"
                />  }
            </div>
        );
    }
}

export default NoteListToolbarSelect;

// export default NoteListToolbarSelect;