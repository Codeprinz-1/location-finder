import React, { useState } from "react";

import GoogleMapReact from "google-map-react";
import Container from "react-bootstrap/Container";
import { getAddress, formatAddress } from "../utils";
import "../styles/map.css";

const defaultCenter = {
  lat: 9.083333333,
  lng: 7.533333,
};

let infoWindow;
let marker;

const Map = () => {
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState(defaultCenter);

  return (
    <Container className="map-wrapper">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_API_KEY }}
        onGoogleApiLoaded={addFindMeButton}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={6}
        zoom={zoom}
      />
    </Container>
  );
};

export default Map;
