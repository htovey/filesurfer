import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { createRef } from "react";
import { Input } from '@mui/material';

export default function Search (props) {
    const searchRef = createRef();

    const submitSearch = (e) => {
        e.preventDefault();
        props.search(searchRef.current.value);
    };

    const clear = (e) => {
        e.preventDefault();
        searchRef.current.value = '';
        props.clearSearch();
    }

    return (
            <Box 
                component="form" 
                noValidate 
                onSubmit={submitSearch}
                // className="searchBar"
                sx={props.searchStyles}
                // sx={{ color: 'purple', p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <Input
                    variant="outlined"
                    required
                    fullWidth
                    name="search"
                    label="Search"
                    id="search "
                    inputRef={searchRef}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="button" onClick={clear}>
                                <ClearIcon/>
                            </IconButton>
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Box>
    );
}

Search.propTypes = { 
    search: PropTypes.func,
    clearSearch: PropTypes.func 
}