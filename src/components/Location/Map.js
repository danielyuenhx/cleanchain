import React from 'react';
import { Box, useColorMode, Button } from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import './Map.css';

function SetViewOnClick({ position }) {
  const map = useMap();
  map.flyTo(position, 10);
  return null;
}

const Map = ({ position }) => {
  return (
    <Box
      height="100%"
      width="100%"
      px="1.5rem"
      py="1rem"
      className="full"
      //   className={colorMode === 'light' ? '' : 'dark'}
      cursor="default"
    >
      <MapContainer center={position} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [20, 30],
            })
          }
        >
          <Popup>
            {position[0]}, {position[1]}
          </Popup>
        </Marker>
        <SetViewOnClick position={position} />
      </MapContainer>
    </Box>
  );
};

export default Map;
