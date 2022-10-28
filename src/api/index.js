import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  const Key = process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY;
  console.log(Key)
  try {
    // request
    // the brackets are kind of like calling .then.json()
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,   { params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      'X-RapidAPI-Key': Key,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }});
    return data; 
  } catch (error) {
    console.log(error);
  }
}