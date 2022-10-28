import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles'
import { useState } from 'react';

const Header = ({setCoords}) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoC) => {setAutocomplete(autoC)};

const onPlaceChanged = () =>{
  const lat = autocomplete.getPlace().geometry.location.lat();
  const lng = autocomplete.getPlace().geometry.location.lng();
  setCoords({lat, lng})
}
  return(
    <AppBar position='staic'>
      <Toolbar className={classes.toolbar}>
          <Typography variant='h5' className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display='flex'>
            <Typography variant='h6' className={classes.title}>
              Explore new places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon/>
                  </div>
                  <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                </div>
              </div>
            </Autocomplete>
          </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;