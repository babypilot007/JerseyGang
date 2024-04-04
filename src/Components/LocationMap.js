import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '95%',
  height: '20vh',

};


const locApi = process.env.REACT_APP_MAP_API 
   
const LocationMap = (props) => {


    const center = {

        lat: parseFloat(props.lat), // default latitude
        lng: parseFloat(props.lng), // default longitude

      };





  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: locApi,
    libraries,
  });



  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (<>
   
      <GoogleMap className='map'
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        mapContainerClassName='map'
      >
        <Marker position={center} />
      </GoogleMap>
      </>
  );
};

export default LocationMap;