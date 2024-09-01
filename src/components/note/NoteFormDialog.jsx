import React, { Component, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CustomTextField from '../custom/CustomTextField';
import Button from '@mui/material/Button';
import '../../styles/App.css';
import { MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import WaitModalComponent from '../modals/WaitModalComponent';

export default function NoteFormDialog (props) {  

  const [directoryInput, setDirectoryInput] = useState();
  const [noteTextInput, setNoteTextInput] = useState('');

   const directoryList = props.directoryList.map(function(directory, i) {
      if (directory.value === '') {
      return <MenuItem classes={{"root": "disabledItem"}} disabled key={i} value={directory}>{directory}</MenuItem>
      }
       return <MenuItem key={i} value={directory}>{directory}</MenuItem>
    });
   


  const getDirectoryStyleClass = () => {
    if (directoryInput === '' && !props.noteModel.directory) {
      return "disabledItem";
    } else {
      return "selectedItem";
    }
  }
 
  const handleSubmit = (e) => {
      e.preventDefault();
      var note = populateNoteModel();
      props.handleNoteValSubmit(note, e);  
  }

  const handleSelect = (e) => {
    setDirectoryInput(e.target.value);
  }

  const handleCancel = () => {
   // resetFormState();
    console.log('handleCancel');
    return props.handleClose();
  }

  const populateNoteModel = () => {
    var noteModel = props.noteModel;
    
    if (directoryInput) {
      noteModel.directory = directoryInput;
    }

    if (noteTextInput !== '') {
      noteModel.noteText = noteTextInput;
    }  

    return noteModel;
  }
  
  //  const StyledContent = withStyles({root: {color : 'red'}})(DialogContentText);
    return (
     
        <Dialog 
          open={props.openNote}
          maxWidth="md"
          aria-labelledby="form-dialog-title">
          <DialogContent className={"noteDialog"}>
            <span>{props.error}</span>
            <Select
              value={props.noteModel.directory || directoryInput || ''}
              displayEmpty
              onChange={ (e) => handleSelect(e) }
              name="directory"
              className={getDirectoryStyleClass()}
              variant="outlined"
              margin="dense"
              required
              fullWidth
            >
              {directoryList}
            </Select>    
             <CustomTextField
              name="noteText"
              required
              defaultValue={props.noteModel.noteText || ''}
              onChange={(e) => setNoteTextInput(e.target.value)}
              label="Note"
              multiline
              rows="15"
            />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
                Save
            </Button>
            <Button onClick={handleCancel}>
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
       
    );
    
  }