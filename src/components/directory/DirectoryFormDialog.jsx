import React, { useState } from 'react';
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

export default function DirectoryFormDialog (props) {

 
    const [directoryInput, setDirectoryInput] = useState();
        
 
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(directoryInput);
    }


   const handleCancel = () => {
        // resetFormState();
        console.log('handleCancel');
        return props.handleClose();
    }

    return (

            <Dialog
                open={props.openDirectoryForm}
                maxWidth="md"
                aria-labelledby="form-dialog-title">
                <DialogContent className={"categoryDialog"}>

                    <CustomTextField
                        name="directoryName"
                        required
                        onChange={(e) => setDirectoryInput(e.target.value)}
                        label="Directory"
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