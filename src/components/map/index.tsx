import { useState } from "react";

import { default as MapGL, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.4, 37.8] },
    },
  ],
};

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};
const Map = () => {
  // console.count("Map");

  return (
    <MapGL
      initialViewState={{
        latitude: 30.959144,
        longitude: 3.14,
        zoom: 2,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_MAPBOX_PUBLIC_TOKEN ?? ""}
    >
      <NavigationControl position="top-right" />
      {/* <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
        <NavigationControl position="top-right" />
      </Source>

      <Marker longitude={-122} latitude={40} anchor="center"></Marker> */}
    </MapGL>
  );
};

export default Map;
