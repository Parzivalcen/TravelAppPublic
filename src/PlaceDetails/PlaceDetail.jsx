import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import { PlaceSharp } from '@material-ui/icons';

const PlaceDetails = ({ place, selected, refProp }) => {
  if(selected){
    
    refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    
  } 
  const classes = useStyles(); 
  const imgPlaceHold = 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
  // check selected and scroll
  return(
    <Card elevation={6}>
      <CardMedia
        style={{minWidth: 380, height: 350}}
        image={place.photo ? place.photo.images.large.url : imgPlaceHold}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        {/* Rating */}
        <Box display="flex" justifyContent="space-between">
          <Rating name='read-only' value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        {/* display how expensive a place is */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        {/* display place ranking */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {/* Awards */}
        {place?.awards?.map((award)=>(
          <Box my={1}  display='flex' justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name}/>
            <Typography variant='subtitle2'>{award.display_name}</Typography>
          </Box>
        ))}
        {/* Type of food */}
        {place?.cuisine?.map(({ name, key })=>(
          
          <Chip key={key + name} size="small" label={name} className={classes.chip}/>
        ))}
        {/* Address */}
        {place?.address && (
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
            <LocationOnIcon/> {place.address}

          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
            <PhoneIcon /> {place.phone}

          </Typography>
        )}
        <CardActions >
          <Button variant='contained' color='primary' size='small' onClick={()=>window.open(place.web_url)}>
            Trip Advisor
          </Button>
          <Button variant='contained' color='primary' size='small' onClick={()=>window.open(place.website)}>
            Website
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  );
};
export default PlaceDetails;