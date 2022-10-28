import React from "react";
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'; 
import Rating from '@material-ui/lab/Rating'

import useStyles from './mapStyles';
import mapStyleBlue from "./mapStyleBlue";

const Map = ({ coords, setCoords, setBounds, places, setChildClicked}) => {
  // const coordinates  = coords;
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px)')
  // place holder img
  const imgPlaceHold = 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
  return (
    <div className={classes.mapContainer}>
      
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_MAP_API_KEY }}
      defaultCenter={coords}
      center = {coords}
      defaultZoom={14}
      margin = {[50,50,50,50]}
      options = {{disableDefaultUI:true, zoomControl:true, styles:mapStyleBlue }}
      onChange = {(e) => {
        setCoords({ lat: e.center.lat, lng: e.center.lng });
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
      }}
      onChildClick = {(child) => {setChildClicked(+child)}}

    >
      {places?.map((place, i)=>(
        // Render places inside of the map
        <div
          className={classes.markerContainer}
          lat = {Number(place.latitude)}
          lng = {Number(place.longitude)}
          key = {i}
        >
          {
            // If mobile just show pointer
            !isMobile ? (
              <LocationOnOutlinedIcon color='primary' fontSize="large"/>
            )
            : 
            // if not mobile, show place with image and rating if available
            (
              <Paper elevation={3} className={classes.paper} >
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>

                <img 
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.small.url : imgPlaceHold}
                  alt={place.name}
                />
                <Rating name='read-only' value={Number(place.rating)} readOnly size="small" className={classes.center} />
              </Paper>
            )
          }

        </div>
      ))}
    </GoogleMapReact>
  </div>
  )
};
export default Map;