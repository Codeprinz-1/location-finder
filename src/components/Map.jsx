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

  const showLocationOnMap = (map, maps, coordinates) => {
    getAddress(coordinates.lat, coordinates.lng).then((address) => {
      const addressCard = document.createElement("div");
      const formattedAddress = formatAddress(address);
      // checks if an infoWindow or marker is open and closes it to avoid duplecate info windows or markers on the map
      marker && marker.setMap(null);
      infoWindow && infoWindow.close();
      addressCard.classList.add("address-card");
      addressCard.innerText = `Hey we found you, you are at ${formattedAddress} 🙂`;
      marker = new maps.Marker({
        position: coordinates,
        map,
      });
      infoWindow = new maps.InfoWindow();
      infoWindow.setContent(addressCard);
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: true,
        });
      });
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
      setZoom(16);
      setCenter(coordinates);
    });
  };

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
