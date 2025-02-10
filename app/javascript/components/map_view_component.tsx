import React, { ComponentProps, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

import {
  divIcon,
  LatLngBounds,
  LatLngBoundsExpression,
  LeafletEvent,
  MarkerCluster,
} from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import ClusterIcon from "./icons/cluster_icon";
import CurrentLocationIcon from "./icons/current_location_icon";
import DefaultPlaceIcon from "./icons/default_place_icon";
import SearchedPlaceIcon from "./icons/searched_place_Icon";

import { useMapContext, Place } from "../context/map_context";
import { useLocationService } from "../services/use_location_service";
import { usePlacesService } from "../services/use_places_service";

import LeftMapOpenIcon from "./icons/left_map_open_icon";
import Sidebar from "./sidebar_component";
import PlacePopUp from "./place_popup_component"

const createDefaultPlaceIcon = () => {
  return divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<DefaultPlaceIcon />),
    iconSize: [30, 30],
    className: "border-none bg-transparent",
  });
};

const createSearchedPlaceIcon = () => {
  return divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<SearchedPlaceIcon />),
    iconSize: [30, 30],
    className: "border-none bg-transparent",
  });
};

const createCurrentLocationIcon = () => {
  return divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<CurrentLocationIcon />),
    iconSize: [30, 30],
    className: "border-none bg-transparent",
  });
};

const createClusterIcon = (cluster: MarkerCluster) => {
  const count = cluster.getChildCount();
  const size = Math.min(40, Math.max(20, count));
  return divIcon({
    html: ReactDOMServer.renderToStaticMarkup(
      <ClusterIcon count={count} size={size} />
    ),
    className: "custom-cluster",
    iconSize: [size, size],
  });
};

interface MapProps extends ComponentProps<"div"> {
  name: string;
}
const MapView: React.FC<MapProps> = ({ name, ...props }) => {
  // MapContainer
  const zoom_level = 13;
  const scrollWheelZoom = true;
  const maxBoundsViscosity = 1.0;
  const maxBounds: LatLngBoundsExpression = [
    [-90, -180],
    [90, 180],
  ];

  // TileLayer
  const urlLayer =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const maxZoom = 19;
  const minZoom = 2;
  const attribution = '© <a href="https://carto.com/attributions">CARTO</a>';
  const opacity = 1.0;

  const mapRef = useRef<any>(null);
  const [sidebarVisible, SetSidebarVisible] = useState(false);

  const { listPlaces, getPlace } = usePlacesService();
  const { getNavigatorLocation } = useLocationService();
  const {
    places,
    updatePlaces,
    filteredPlaces,
    searchPosition,
    updateSearchPosition,
  } = useMapContext();

  const loadBoundPlaces = async (bounds: LatLngBounds) => {
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const { data } = await listPlaces(northEast, southWest);

    if (filteredPlaces.length) {
      const updatedPlaces = replaceMatchingPlaces(data, filteredPlaces);
      updatePlaces(updatedPlaces);
    } else {
      updatePlaces(data);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      moveend: (e: LeafletEvent) => loadBoundPlaces(e.target.getBounds()),
      zoomend: (e: LeafletEvent) => loadBoundPlaces(e.target.getBounds()),
    });
    return null;
  };

  const ClickToCopyCoordinates = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const coords = `${lat}, ${lng}`;

        navigator.clipboard
          .writeText(coords)
          .catch((err) => console.error("Erro ao copiar coordenadas:", err));
      },
    });

    return null;
  };

  function replaceMatchingPlaces(
    places: Place[],
    filteredPlaces: Place[]
  ): Place[] {
    const newPlaces = [...places];

    filteredPlaces.forEach((filteredPlace) => {
      const index = newPlaces.findIndex(
        (place) => place.id === filteredPlace.id
      );

      if (index !== -1) {
        newPlaces[index] = filteredPlace;
      }
    });

    return newPlaces;
  }

  useEffect(() => {
    getNavigatorLocation(async (coords: any) => {
      updateSearchPosition([coords.latitude,coords.longitude]);
      getPlace(`${coords.latitude},${coords.longitude}`)
    });
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      loadBoundPlaces(mapRef.current.getBounds());
    }
  }, [mapRef.current]);

  useEffect(() => {
    if (mapRef.current && searchPosition) {
      mapRef.current.flyTo(searchPosition, 16);
    }
  }, [searchPosition]);

  return (
    <div className="map-view" {...props}>
      <button
        className="map-toggle-sidebar btn-base"
        onClick={() => SetSidebarVisible(!sidebarVisible)}
      >
        <LeftMapOpenIcon />
      </button>
      {sidebarVisible && <Sidebar />}
      <MapContainer
        center={searchPosition}
        zoom={zoom_level}
        scrollWheelZoom={scrollWheelZoom}
        maxBounds={maxBounds}
        maxBoundsViscosity={maxBoundsViscosity}
        ref={mapRef}
        attributionControl={false}
        className="map-container"
        zoomControl={false}
      >
        <ClickToCopyCoordinates />
        <ZoomControl position="topright" />
        <TileLayer
          url={urlLayer}
          maxZoom={maxZoom}
          minZoom={minZoom}
          attribution={attribution}
          opacity={opacity}
          className="tile-layer"
        />
        <MapEvents />
        <Marker position={searchPosition} icon={createCurrentLocationIcon()}>
          <Popup>Minha Localização</Popup>
        </Marker>
        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom
          showCoverageOnHover
          zoomToBoundsOnClick
          iconCreateFunction={createClusterIcon}
          disableClusteringAtZoom={14}
          className="marker-cluster-group"
        >
          {places.map((place) => (
            <Marker
              key={`marker_${place.id}`}
              position={[place.latitude, place.longitude]}
              icon={
                place.is_filtered
                  ? createSearchedPlaceIcon()
                  : createDefaultPlaceIcon()
              }
            >
              <Popup>
                <PlacePopUp name={place.name} type={place.type} description={place.description}/>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapView;
