import React from 'react';
import IconButton from '@mui/material/IconButton'; 
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {LaunchIcon} from '@mui/icons-material/Launch';
import Toolbar from '@mui/material/Toolbar';
import Search from '../actions/search';


export default function CrudToolbar (props) {
    
    return (
        <Toolbar sx={props.options.toolbarStyles}>
            {/* {this.state.loading && <CircularProgress/>}  */}
            <Tooltip title={props.options.addTooltip}>
                <span>
                    <IconButton 
                        className="iconButton"
                        disabled={props.multiSelect || props.rowSelected} 
                        onClick={props.options.add}>
                            <AddCircleOutlineRoundedIcon/>     
                    </IconButton>
                </span>
            </Tooltip>
            {props.options.showLaunch &&
            <Tooltip title={props.options.loadTooltip}>
                <span>
                    <IconButton 
                        className="iconButton" 
                        disabled={!props.rowSelected && !props.overrideLaunch}
                        onClick={props.options.load}>
                            <LaunchIcon/>
                    </IconButton>
                </span>
            </Tooltip>}
            <Tooltip title={props.options.editTooltip}>
                <span>
                    <IconButton 
                        className="iconButton" 
                        disabled={!props.rowSelected} 
                        onClick={props.options.edit}>
                            <EditRoundedIcon/>    
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={props.options.deleteTooltip}> 
                <span>
                    <IconButton 
                        className="iconButton" 
                        onClick={props.options.delete}
                        disabled={!props.rowSelected && !props.multiSelect}>
                            <DeleteIcon className="deleteIcon"/>
                    </IconButton>
                </span>   
            </Tooltip>
            <span className='data-grid-title'>{props.options.title}</span>
            {props.useSearch &&                 
                <Search 
                    searchStyles={props.options.searchStyles}
                    search={props.search} 
                    clearSearch={props.clearSearch}
                />
            }
            <IconButton 
                className="iconButton" 
                onClick={props.options.close}>
                    <CloseIcon className="close-icon"/>
            </IconButton>        
        </Toolbar>
    );
}