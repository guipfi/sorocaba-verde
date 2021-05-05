import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Icon } from 'leaflet';
import L from 'leaflet';

import mapPin from './assets/map-pin.svg';

import './styles/geosearch.css';

// Latitude: -23.5062, Longitude: -47.4559

function Mapa(props){

  useEffect(() => {

    const script = document.createElement('script');
    const sheet = document.createElement('link');

    script.src = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js";
    script.async = true;

    sheet.rel = 'stylesheet';
    sheet.href = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css";
    sheet.type = 'text/css';
  
    document.head.appendChild(script);
    document.head.appendChild(sheet);
  
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(sheet);
    }
  }, []);

  const centerPos = [-23.5062, -47.4559];

  const [markedPosition, setMarkedPosition] = useState(null);

  const AddMarker = () => {

    const map = useMap();

    useMapEvents({
      click: (e) => {
        const geocoder = L.Control.Geocoder.nominatim();
        geocoder.reverse(
          e.latlng,
          map.options.crs.scale(map.getZoom()),
          results => {
            var r = results[0];
            if (r) {
              let marker = markedPosition;
              if (marker) {
                marker
                  .setLatLng(r.center)
                  .setPopupContent(r.html || r.name)
                  .openPopup();
              } else {
                marker = L.marker(r.center)
                  .bindPopup(r.name)
                  .addTo(map)
                  .openPopup();
              }
              setMarkedPosition(marker);
            }
          }    
        );
      }
    });

    return null;
  }
  
  const MapSearchControl = () => {

    const map = useMap();

    useEffect(() => {

      const searchControl = new SearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        autoComplete: false,
      });

      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
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
        if(solicitation.lat && solicitation.long) {
          const position = [solicitation.lat, solicitation.long];
        
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
      <AddMarker />
      <MapSearchControl />
    </MapContainer>
  )  
}

export default Mapa;