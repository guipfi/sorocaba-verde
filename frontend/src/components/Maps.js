import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader ,StandaloneSearchBox, Marker, InfoWindow, useGoogleMap } from '@react-google-maps/api';
import {Link} from 'react-router-dom';

import treePin from './assets/tree-pin.svg';
import solicitationPin from './assets/solicitation-pin.svg';

const { API_KEY } = require('../config/mapsAPI.json');

const libraries = ["places"];

function Mapa(props) {

  const firstUpdate = useRef(true);

  const [mapRef, setMapRef] = useState(null);

  const [searchBox, setSearchBox] = useState(null);

  const [currentMarker, setCurrentMarker] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);

  const [markerType, setMarkerType] = useState(null);

  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const [centerPos, setCenterPos] = useState({
    lat: -23.5062, 
    lng: -47.4559 
  });

  let { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries
  });

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      if(!currentAddress) {
        setCurrentMarker(null);
        console.log("Endereço inválido, lembre-se nosso sistema de arborização é válido somente em Sorocaba");
        setError("Endereço inválido, lembre-se nosso sistema de arborização é válido somente em Sorocaba");
        setShowError(true);
      } 
    }
  },[currentAddress]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      if(currentMarker) {
        mapRef.panTo(currentMarker);
      }
    }
  }, [currentMarker]);

  const PinActionButton = ({type}) => {

    // type: tree -- Sistema: Ver informações/ Usuário: Criar solicitação
    // type: solicitation -- Sistema/Usuário: Ver informações
    // type: newPin -- Sistema: Criar árvore / Usuário: Criar solicitação

    let buttonTittle = "";
    let base = "";

    console.log(type);

    if(props.isSystem) {
      switch(type) {
        case "tree":
          base = "sistema/treeRegister?"
          buttonTittle = "Ver informações"
          break;
        case "solicitation":
          base = "sistema/treeRegister?"
          buttonTittle = "Ver informações"
          break;
        case "newPin":
          base = "treeRegister?"
          buttonTittle = "Cadastrar nova árvore"
          break;
      }
    } else {
      switch(type) {
        case "tree":
        case "newPin":
          base = "/solicitation?"
          buttonTittle = "Criar nova solicitação"
          break;
        case "solicitation":
          //base = "/solicitation?"
          buttonTittle = "Ver informações"
          break;
      }
    }
  
    const coords = `lat=${currentMarker.lat}&lng=${currentMarker.lng}&`;
    const address = `address=${currentAddress}`;
    const location = base+coords+address;

    return (
      <button className="button-container">
        <Link to={location}>{buttonTittle}</Link>
      </button>
    );

  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }; 
        setCurrentMarker(pos);
     });
    }
  }

  async function setAddressByCords(position) {
    const geocoder = new window.google.maps.Geocoder();
  
    await geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const address = results[0].formatted_address;
          const formated_address = formatAddress(address);
          if(formated_address) {
            console.log(formated_address);
            setCurrentAddress(formated_address);
            return;
          }
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
      setCurrentAddress(null);
    });
  }

  function formatAddress(address) {
    const index_find = address.search("Sorocaba");
    if(index_find == -1 || index_find == 0) {
      return null;
    } else {
      const formated_address = address.substring(0, index_find-2);
      return formated_address;
    }
  }

  async function onPlacesChanged() {
    const place = searchBox.getPlaces()[0];
    const location = place.geometry.location;
    const position = {
      lat: location.lat(),
      lng: location.lng()
    }
    await setAddressByCords(position);
    setCurrentMarker(position);
  }

  function onMapClickHandler(e) {
    const position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setCurrentMarker(position);
    setInfoWindowVisible(false);
  }

  async function handleInfoWindow(e) {
    const position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    await setAddressByCords(position);
    setInfoWindowPosition(position);
  }

  async function handleNewMarkerClick(e) {
    setMarkerType("newPin");
    handleInfoWindow(e).then(() => setInfoWindowVisible(true));
  }

  async function handleSolicitationsMarkerClick(e) {
    setMarkerType("solicitations");
    handleInfoWindow(e).then(() => setInfoWindowVisible(true));
  }

  function renderInfoWindow() {
    return (
      <InfoWindow
        position={infoWindowPosition}
        onCloseClick={() => setInfoWindowVisible(false)}
      >
        <div style={styles.infoWindowStyle}>
          <h1>InfoWindow</h1>
          <p>{currentAddress}</p>
          <PinActionButton type={markerType}></PinActionButton>
        </div>
      </InfoWindow>
    )
  }

  const renderMap = (props) => {

    function onLoadMap(map) {
      setMapRef(map);
      console.log(props);
      console.log(props.solicitations);
    }
    function onLoadSearchBox(searchBox) {
      setSearchBox(searchBox);
    } 
    return (
    <GoogleMap
      id="map"
      mapContainerStyle={styles.mapContainer}
      zoom={14}
      center={centerPos}
      onLoad={onLoadMap}
      onClick={onMapClickHandler}
      options={{
        styles: [    
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }        
        ]
      }}
    >  
    <StandaloneSearchBox
      onLoad={onLoadSearchBox}
      onPlacesChanged={onPlacesChanged}
    > 
      <div style={styles.searchBox}>
        <i class="fas fa-search" style={{fontSize: '1rem'}}/>
        <input
          type="text"
          placeholder="Buscar localização..."
          style={styles.searchBoxInput}
        />
      </div>
    </StandaloneSearchBox>
    {props.solicitations?.map(solicitation => {
      if(solicitation.lat && solicitation.lng) {
        let position = { lat: solicitation.lat, lng: solicitation.lng };
      
        return (
          <Marker position={position} icon={solicitationPin} onClick={handleSolicitationsMarkerClick}></Marker>
        );
      }
    })}
    {currentMarker ? <Marker position={currentMarker} onClick={handleNewMarkerClick} style={{height: '10rem'}} draggable={true}></Marker> : null}
    {infoWindowVisible ? renderInfoWindow() : null}
    <button onClick={getCurrentLocation} style={styles.buttonStyle}><i class="fas fa-crosshairs"></i></button>
  </GoogleMap>
    );}
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap(props) : <div>Loading...</div>
}

const styles = {
  mapContainer: {
    width: '100%',
    height: '100%'
  },
  searchBox: {
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
  },
  searchBoxInput: {
    width: '100%', 
    height: '100%',
    fontSize: `1rem`,
    outline: `none`,
    border: 0,
    marginLeft: '1rem',
  },
  infoWindowStyle: {
    background: `white`,
    padding: 15
  },
  buttonStyle: {
    width: '3rem',
    height: '3rem',
    position: 'absolute',
    top: '4.5rem',
    right: '0.4rem',
    backgroundColor: 'white',
    color: 'gray',
    cursor: 'pointer'
  }
}

export default React.memo(Mapa)