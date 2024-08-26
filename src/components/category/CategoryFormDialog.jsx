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
import { CATEGORIES } from '../../constants/Categories'
import WaitModalComponent from '../modals/WaitModalComponent';

export default class CategoryFormDialog extends Component {

  constructor(props) {
    super(props);
    this.state={
      labelInput: '',
      valueInput: ''
    }
   }
 
  handleSubmit = (e) => {
      e.preventDefault();
      var category = this.populateCategoryModel();
      this.props.handleCategoryValSubmit(category, e);  
  }

  handleSelect = (e) => {
    this.setState({ categoryInput: e.target.value });   
  }

  handleCancel = () => {
   // this.resetFormState();
    console.log('handleCancel');
    return this.props.handleClose();
  }

  populateCategoryModel = () => {
    var categoryModel = this.props.categoryModel;
    
    if (this.state.labelInput) {
      categoryModel.label = this.state.labelInput;
    }

    if (this.state.valueInput) {
      categoryModel.value = this.state.valueInput;
    }  

    return categoryModel;
  }
  
  render () {
    
    return (
     
        <Dialog 
          open={this.props.openCategory}
          maxWidth="md"
          aria-labelledby="form-dialog-title">
          <DialogContent className={"categoryDialog"}>
   
             <CustomTextField
              name="categoryLabel"
              required
              defaultValue={this.props.categoryModel.label || ''}
              onChange={(e) => this.setState({labelInput: e.target.value})}
              label="Label"
            />
            <CustomTextField  
              name="categoryValue"  
              required
              defaultValue={this.props.categoryModel.value || ''}
              onChange={(e) => this.setState({valueInput: e.target.value})}
              label="Value"
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