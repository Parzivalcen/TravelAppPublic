import React, {useEffect, useState} from 'react';

import { getPlacesData } from './api';
import { CssBaseline, Grid } from '@material-ui/core';

// import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/map';


const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // register childClicked on map
  const [childClicked, setChildClicked] = useState(null);
  // { location_id: "8789766", name: "Cafe Couscous - Vege", latitude:"12.91283", longitude:"100.87808"}
  const [coords, setCoords] = useState({});
  // map bounds
  const [bounds, setBounds] = useState({});
  const [isLoading, setLoading] = useState(false);
  // location type
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  // Get user location
  useEffect(()=>{
    
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoords({lat: latitude, lng: longitude})
    })
  },[]);

  //filter places by rating
  useEffect(()=>{
    const filteredPlaces = places.filter((place)=>place.rating > rating);
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  // get Data
  useEffect(()=>{
    if(bounds.sw && bounds.ne){
      setLoading(true);
      
      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data)=>{
        // console.log(data);
        setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0)); 
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [type, bounds])
  return (
    <>
  <CssBaseline/>
  <Header setCoords={setCoords} />
    <Grid container sapacing={3} style={{width: '100%'}}>
      <Grid item xs={12} md ={4}>
        <List 
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked = {childClicked}
          isLoading = {isLoading}
          type = {type}
          setType = {setType}
          rating = {rating}
          setRating = {setRating}
          />
      </Grid>
      <Grid item xs={12} md = {8}>
        <Map
          setCoords = {setCoords}
          setBounds = {setBounds}
          setChildClicked = {setChildClicked}
          coords = {coords}
          places = {filteredPlaces.length ? filteredPlaces : places}
          
        />
      </Grid>
    </Grid>
  </>

);
}

export default App;
