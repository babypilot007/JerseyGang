import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '95%',
  height: '20vh',
  border : 'solid black 1px'
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
    <div className='map'>
      <GoogleMap className='map'
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default LocationMap;