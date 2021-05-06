import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, useMapEvent } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {Link} from 'react-router-dom';
import { Icon, popup } from 'leaflet';
import 'leaflet-easybutton';
import * as L from 'leaflet';
import axios from 'axios';

import mapPin from './assets/map-pin.svg';

import './styles/geosearch.css';

// Latitude: -23.5062, Longitude: -47.4559

function Mapa(props){

  const centerPos = [-23.5062, -47.4559];

  const [markedPosition, setMarkedPosition] = useState(null);

  const [popUpText, setPopUpText] = useState();

  async function geocodeReverse(map, latlng) {
    console.log(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=${Math.floor(map.getZoom())}&addressdetails=1`);
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=${Math.floor(map.getZoom())}&addressdetails=1`)
    .then(res =>{
      console.log(res);
      setPopUpText(res.data.address.road + ", " + res.data.address.suburb);
    });
  }

  const CreateSolicitationBTN = () => {

    console.log(markedPosition);

    const base = "/solicitation?"
    const coords = `lat=${markedPosition.lat}&lng=${markedPosition.lng}&`;
    const address = `address=${popUpText}`;
    const createNewSolicitation = base+coords+address;

    return (
      <div className="button-container">
        <Link to={createNewSolicitation}>Nova solicitação</Link>
      </div>
    );

  }


  function userLocationMarker(map) {

    map.locate()
      .on('locationfound', function(e) {
        setMarkedPosition(e.latlng);
        geocodeReverse(map, e.latlng);
        map.flyTo(e.latlng, map.getZoom())
      });
  }

  const AddMarker = () => {

    const map = useMap();
  
    useMapEvents({
      click: (e) => {    
        setMarkedPosition(e.latlng);
        geocodeReverse(map, e.latlng);
      }
    });
  
    return null;
  };

  const LocationControl = () => {

    const map = useMap();

    useEffect(() => {
      const buttonLocation = L.easyButton('fa-crosshairs', function(btn, map){
        userLocationMarker(map);
      }).addTo(map);

      return () => buttonLocation.remove();

    }, []);

    return null;
  }

  const mapMarker = new Icon({
    iconUrl: mapPin,
    iconSize: [52, 52],
    popupAnchor: [-3, -36],
  });
  
  return(
      <MapContainer className="map" style={{width: "100%", height: "100%"}} center={centerPos} zoom={13} scrollWheelZoom={false}>
      {}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.solicitations?.map(solicitation => {
        if(solicitation.lat && solicitation.lng) {
          const position = [solicitation.lat, solicitation.lng];
        
          return (
            <Marker position={position} icon={mapMarker}>
            <Popup>
              {solicitation.type} | {solicitation.address} <br /> Data: {solicitation.date} - Prioridade: {solicitation.priority} <br />
            </Popup>
          </Marker>
          );
        }

        return;
      })}
      {markedPosition && 
        <Marker position={markedPosition}>
          <Popup>{popUpText}<br /><br />
            <CreateSolicitationBTN />
          </Popup>
        </Marker>
      }
      <AddMarker />
      <LocationControl />
    </MapContainer>
  )  
}

export default Mapa;