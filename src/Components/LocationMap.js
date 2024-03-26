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

const LocationMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB4xmI2KDHHEAQcP1I3iIDWhb_c-yubzTk',
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
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default LocationMap;