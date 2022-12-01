import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

export default function SmallMap({ coordinates }) {
  return (
    <ComposableMap
      projectionConfig={{ center: [3.4360, 55.3781]}}
      projection="geoMercator"
      width={980}
      height={551}
      style={{
        width: '100%',
        height: 'auto',
      }}
    >
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        <Marker coordinates={[3.4360, 55.3781]}>
          <circle r={10} fill="#F00" stroke="#fff" strokeWidth={1} />
        </Marker>
      </ZoomableGroup>
    </ComposableMap>
  );
}
