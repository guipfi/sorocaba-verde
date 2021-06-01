import React from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const { API_KEY } = require('../config/mapsAPI.json');

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const centerPos = { 
  lat: -23.5062, 
  lng: -47.4559 
};

const onLoad = ref => console.log(this);

const onPlacesChanged = () => console.log(this);

function Mapa() {

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={centerPos}
      >
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        > 
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid transparent`,
              width: `30rem`,
              height: `2.5rem`,
              padding: `0 12px`,
              borderRadius: `3px`,
              backgroundColor: 'white',
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "30%",
              top: "5%",
            }}
          >
            <i class="fas fa-search"
              style={{fontSize: '1rem'}}
            />
            <input
              type="text"
              placeholder="Buscar localização..."
              style={{
                width: '100%', 
                height: '100%',
                fontSize: `1rem`,
                outline: `none`,
                border: 0,
                marginLeft: '1rem',
              }}
              
            />
          </div>
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Mapa)