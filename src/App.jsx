import React, { Component } from 'react';
import './styles/App.css';
import { AppBar } from '@mui/material';
import LoginComponent from './components/login/LoginComponent';
import NoteComponent from './components/note/NoteComponent';
import NoteListComponent from './components/note/NoteListComponent';
import { createMuiTheme } from '@mui/material/styles';
import FetchUtil from './utils/FetchUtil';
import NoteListToolbar from './components/note/NoteListToolbar';
import CustomSnackBar from './components/custom/CustomSnackBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import WaitModalComponent from './components/modals/WaitModalComponent';
import Button from '@mui/material/Button';
import CategoryComponent from './components/category/CategoryComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      noteList: [],
      openLogin: true,
      openNote: false,
      showNoteList: false,
      loading: false,
      userToken: '',
      snackBarOpen: false,
      vertical: 'top',
      horizontal: 'center',
      actionType: 'create',
      noteModel: {
        noteId: '',
        category: '',
        noteText: ''
      },
      categoryModel: {
        id: '',
        label: '',
        value: ''
      }
    }
  }

  handleCategorySubmit = (category, event) => {
    event.preventDefault();
    //build note payload
    const url = process.env.REACT_APP_API_URL || 'http://18.191.225.26:8181';
    const categoryUrl = url+"/category"
    const categoryBody =  {
        "id": category.id === ''? null: category.id,
        "label": category.label,
        "value": category.value
    }
    this.setState({loading: true});
    var response = FetchUtil.handlePost(categoryUrl, this.state.userToken, categoryBody)
        .then(response => {
            if (response.status === 200) {
                console.log("Success***");
                this.handleCRUDSuccess(this.state.actionType);
            }
          }).catch((error) => {
            console.log(error);
            this.handleError('Save failed. Please try again.');
        }); 
  }

  handleNoteSubmit = (note, event) => {
    event.preventDefault();
    //build note payload
    const url = process.env.REACT_APP_API_URL || 'http://18.191.225.26:8181';
    const noteUrl = url+"/note"
    const noteBody =  {
        "noteId": note.noteId,
        "category": note.category,
        "noteText": note.noteText
    }
    this.setState({loading: true});
    var response = FetchUtil.handlePost(noteUrl, this.state.userToken, noteBody)
        .then(response => {
            if (response.status === 200) {
                console.log("Success***");
                this.handleCRUDSuccess(this.state.actionType);
            }
        })    
        .catch((error) => {
            console.log(error);
            this.handleError('Save failed. Please try again.');
        }); 
  }

  handleLoginSuccess = (notes, user, openLogin) => {
    console.log('handleLoginSuccess()');
    this.setState({userToken: user});
    this.setState({openLogin: openLogin});
    this.setState({noteList: this.buildNoteList(notes, this.getFormattedDate)});
    this.toggleNoteList();
  }

  handleCRUDSuccess = (action) => {
    console.log("handleCRUDSuccess action:"+action);
    this.setState({
      openNote : false, 
      openCategory: false,
      noteModel : this.resetNoteModel,
      categoryModel : this.resetCategoryModel,
      actionType: action
    });
    this.refreshNoteList();
  }

  handleError = (message) => {
    console.log('NoteComponent handleError()');
    if(this.props.openNote === true) {
        this.setState({ error: message});
    }
  }

  buildNoteList = (notes, dateFormatter) => {
    var noteList = [];
    notes.map(function(note) { 
      note.saveDate = dateFormatter(note.saveDate);
      noteList.push(note);
    })
    // noteList.push([note.noteId,note.category,note.noteText, dateFormatter(note.saveDate)]);

    return noteList;
  }
    
  refreshNoteList = () => {
    console.log("refreshNoteList()");
    const baseUrl = process.env.REACT_APP_API_URL || 'http://18.191.225.26:8181';
    var url = baseUrl+"/notes";
    var result = FetchUtil.handleGet(url, this.state.userToken);
    result
    .then(response => response.json())
    .then(json => {
     // this.setState({loading: false});
      this.setState({snackBarOpen: true});
      this.setState({noteList: this.buildNoteList(json, this.getFormattedDate)});
    })
    .catch((error) => {
      return error;
    });
  }

  toggleNoteList = () => {
    if (this.state.showNoteList == true) {
      this.setState({showNoteList: false});
    } else {
      this.setState({showNoteList: true});
    }
  }

  resetNoteModel = () => {
    this.setState({
      noteModel: {
        noteId: '',
        category: '',
        noteText: ''
      }
    });
  }

  resetCategoryModel = () => {
    this.setState({
      categoryModel: {
        id: '',
        label: '',
        value: ''
      }
    });
  }

  getNoteFormData = async (updateNoteModel) => {
    if (updateNoteModel.noteId) {
      console.log("updating node model");
      this.setState({noteModel: {
        noteId: updateNoteModel.noteId,
        category: updateNoteModel.category,
        noteText: updateNoteModel.noteText
      }, actionType: "update"});
    } else {
      this.setState({actionType: "create"});
    }
    await this.getCategoryList();
  }

  getCategoryList = async () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://18.191.225.26:8181';
    var url = baseUrl+"/categories";
    var result = FetchUtil.handleGet(url, this.state.userToken);
    result
    .then(response => response.json())
    .then(json => {
      this.setState({categoryList: json});
      this.setState({openNote: true});
    })
    .catch((error) => {
      return error;
    });
  }

  createNewCategory = () => {
    this.setState({openCategory: true});
  }

  getFormattedDate = (rawDate) => {
    var newDate = new Date(rawDate);
    const options = {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: 'America/New_York',
    };
    var date = newDate.toLocaleString('en-US', options);
    return date;
  }

  getSnackbarMsg = () => {
    var noteAction = 'created';
    if (this.state.actionType === 'update') {
      noteAction = 'updated';
    } else if (this.state.actionType === 'delete') {
      noteAction = 'deleted'
    }
    //var msg = 'Success! Note '+noteAction+'.'
    let msg = 'Success!';
    return msg;
  }

  closeSnackBar = () => {
    this.setState({snackBarOpen: false});
  }

  closeNote = () => {
    console.log('close note');
    this.resetNoteModel();
    this.refreshNoteList();
    this.setState({openNote: false});
  }

  closeCategory = () => {
    console.log('close note');
    this.resetCategoryModel();
   // this.refreshCategoryList();
    this.setState({openCategory: false});
  }

  setSelectedRows = (rowData) => {
    var index = this.state.selectedRows.length;
    rowData.map(row => {
      this.state.selectedRows[index] = row;
      index++;
    });
  } 

  render() {
    return (
 
        <div className="App">
          <AppBar title="Nerd Notes" showMenuIconButton={false} className={"AppBar"}>
            <Tooltip title="Add Note" aria-label="add">
              <AddCircleIcon onClick={this.getNoteFormData} className={"addNoteIcon"}/>
            </Tooltip>
            <Tooltip title="Add Category" aria-label="add-category">
              <Button onClick={this.createNewCategory} children={"Add Category"} className={"addCategoryIcon"}/>
            </Tooltip>
          </AppBar> 
          <CustomSnackBar 
            open={this.state.snackBarOpen} 
            vertical={this.state.vertical} 
            horizontal={this.state.horizontal}
            getAlertMsg={this.getSnackbarMsg}
            handleClose={this.closeSnackBar}
          />
          {this.state.openLogin &&
            <LoginComponent 
              openLogin={this.state.openLogin}
              handleSuccess={this.handleLoginSuccess}
            />}   
          {this.state.showNoteList && 
            <NoteListComponent 
              handleSuccess={this.handleCRUDSuccess} 
              userToken={this.state.userToken} 
              notes={this.state.noteList}
              setSelectedRows={this.setSelectedRows}
              getNoteFormData={this.getNoteFormData}
            />}    
          {this.state.openNote &&
            <NoteComponent 
              categoryList={this.state.categoryList}
              user={this.state.userToken} 
              openNote={this.state.openNote}
              handleSuccess={this.handleCRUDSuccess}s
              noteModel={this.state.noteModel}
              handleNoteSubmit={this.handleNoteSubmit}
              handleClose={this.closeNote}
            />}  
          {this.state.openCategory && 
            <CategoryComponent
              openCategory={this.state.openCategory}
              handleSuccess={this.handleCRUDSuccess}
              handleCategorySubmit={this.handleCategorySubmit}
              handleClose={this.closeCategory}
              categoryModel={this.state.categoryModel}
            />
            }   
        </div>

    );
  }
};

export default App;
