import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import './SmallMap.css';

const SmallMap = ({ position }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      height="100%"
      width="25%"
      px="1.5rem"
      py="1rem"
      // className={colorMode === 'light' ? '' : 'dark'}
      cursor="default"
    >
      <MapContainer center={position} zoom={15} zoomControl={false} dragging={false} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [12, 20],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default SmallMap;
