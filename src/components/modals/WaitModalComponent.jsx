import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';

export default function WaitModalComponent(props) {
   
    return (
            <Dialog open={props.loading}>
                <CircularProgress/>
            </Dialog>
    );
    
}

