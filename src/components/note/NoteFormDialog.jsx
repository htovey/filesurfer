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

export default class NoteFormDialog extends Component {

  constructor(props) {
    super(props);
    this.state={
      categoryInput: '',
      noteTextInput: '',
      placeHolder: '',
      categoryList: this.buildCategoryList(),
    }
   }

  buildCategoryList = () => {
    let catList = this.props.categoryList.map(function(category, i) {
      if (category.value === '') {
      return <MenuItem classes={{"root": "disabledItem"}} disabled key={category.value} value={category.value}>{category.label}</MenuItem>
      }
       return <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
    });
    return catList;
  } 

  getCategoryValue = () => { 
    let val = '';
    let stateCat = this.state.categoryInput;
    let modelCat = this.props.noteModel.category;
    if(stateCat !== '') {
      //always use state value if it has been set
      val = stateCat;
    } else if (modelCat) {
      //use model value when editing existing note, where state has not been set
      val = modelCat;
    }
    //return default empty value if neither state nor model has been set 
    console.log('set cat val to: '+val);
    return val;
  }

  getCategoryStyleClass = () => {
    if (this.state.categoryInput === '' && !this.props.noteModel.category) {
      return "disabledItem";
    } else {
      return "selectedItem";
    }
  }
 
  handleSubmit = (e) => {
      e.preventDefault();
      var note = this.populateNoteModel();
      this.props.handleNoteValSubmit(note, e);  
  }

  handleSelect = (e) => {
    this.setState({ categoryInput: e.target.value });   
  }

  handleCancel = () => {
   // this.resetFormState();
    console.log('handleCancel');
    return this.props.handleClose();
  }

  populateNoteModel = () => {
    var noteModel = this.props.noteModel;
    
    if (this.state.categoryInput) {
      noteModel.category = this.state.categoryInput;
    }

    if (this.state.noteTextInput) {
      noteModel.noteText = this.state.noteTextInput;
    }  

    return noteModel;
  }
  
  render () {
  //  const StyledContent = withStyles({root: {color : 'red'}})(DialogContentText);
    return (
     
        <Dialog 
          open={this.props.openNote}
          maxWidth="md"
          aria-labelledby="form-dialog-title">
          <DialogContent className={"noteDialog"}>

            <Select
              value={this.getCategoryValue()}
              displayEmpty
              onChange={ (e) => this.handleSelect(e) }
              name="category"
              className={this.getCategoryStyleClass()}
              variant="outlined"
              margin="dense"
              required
              fullWidth
            >
              {this.state.categoryList}
            </Select>    
             <CustomTextField
              name="noteText"
              required
              defaultValue={this.props.noteModel.noteText || ''}
              onChange={(e) => this.setState({noteTextInput: e.target.value})}
              label="Note"
              multiline
              rows="15"
            />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
                Save
            </Button>
            <Button onClick={this.handleCancel}>
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
       
    );
    }
  }