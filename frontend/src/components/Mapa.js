import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import { Icon, Control} from 'leaflet';

import mapPin from './assets/map-pin.svg';

// Latitude: -23.5062, Longitude: -47.4559

function Mapa(props){

  if(!props.solicitations) {
    props.solicitations = [];
  }

  const centerPos = [-23.5062, -47.4559];

  function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
    })
    return null
  }

  const mapMarker = new Icon({
    iconUrl: mapPin,
    iconSize: [52, 52],
    popupAnchor: [-3, -36],
  });
  
  return(
      <MapContainer className="map" style={{width: "100%", height: "100%"}} center={centerPos} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.solicitations.map(solicitation => {
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
      <SetViewOnClick />
    </MapContainer>
  )  
}

export default Mapa;