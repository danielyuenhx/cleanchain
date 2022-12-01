import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import './Map.css';

function SetViewOnClick({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

const Map = ({ position }) => {
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <Box
      height="100%"
      width="25%"
      className={colorMode === 'light' ? '' : 'dark'}
    >
      <MapContainer center={position} zoom={9} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetViewOnClick position={position} />
      </MapContainer>
    </Box>
  );
};

export default Map;
