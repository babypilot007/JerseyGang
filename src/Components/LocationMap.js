import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '20vh',
  right:'10px'
};
const center = {
  lat: 40.727667, // default latitude
  lng: -74.030865, // default longitude
};

const locApi = process.env.REACT_APP_MAP_API    
const LocationMap = () => {

console.log(locApi)

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

  return (
      <GoogleMap className='map'
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        mapContainerClassName='map'
      >
        <Marker position={center} />
      </GoogleMap>
  );
};

export default LocationMap;