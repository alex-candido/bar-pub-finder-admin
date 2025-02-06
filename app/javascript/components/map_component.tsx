import React, { ComponentProps, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

import {
  LatLngBounds,
  LatLngBoundsExpression,
  LatLngExpression,
  LeafletEvent,
  MarkerCluster,
  divIcon,
} from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import ClusterIcon from "./icons/cluster_icon";

import { usePlacesService } from "../services/use_places_service";
import { useLocationService } from "../services/use_location_service";
import { useMapContext } from "../context/map_context";

interface Place {
  id: number;
  name: string;
  description: string | null;
  type: string;
  status: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  info: any;
}

interface MapProps extends ComponentProps<"div"> {
  name: string;
}

// MapContainer
const default_position: LatLngExpression = [-3.71722, -38.5433];
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

const Map: React.FC<MapProps> = ({ name, ...props }) => {
  const mapRef = useRef<any>(null);
  const [position, setPosition] = useState<LatLngExpression>(default_position);

  const { listPlaces } = usePlacesService();
  const { getNavigatorLocation } = useLocationService();
  const { places, updatePlaces, filteredPlaces } = useMapContext();

  const loadBoundPlaces = async (bounds: LatLngBounds) => {
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const { data } = await listPlaces(northEast, southWest);
    updatePlaces(data);
  };

  const MapEvents = () => {
    useMapEvents({
      moveend: (e: LeafletEvent) => loadBoundPlaces(e.target.getBounds()),
      zoomend: (e: LeafletEvent) => loadBoundPlaces(e.target.getBounds()),
    });
    return null;
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

  useEffect(() => {
    getNavigatorLocation((coords: any) => {
      setPosition([coords.latitude, coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      loadBoundPlaces(mapRef.current.getBounds());
    }
  }, [mapRef.current]);

  useEffect(() => {
    console.log("filteredPlaces", filteredPlaces)
  }, [filteredPlaces])
  return (
    <div className="map-view" {...props}>
      <MapContainer
        center={position}
        zoom={zoom_level}
        scrollWheelZoom={scrollWheelZoom}
        maxBounds={maxBounds}
        maxBoundsViscosity={maxBoundsViscosity}
        ref={mapRef}
        className="map-container"
      >
        <TileLayer
          url={urlLayer}
          maxZoom={maxZoom}
          minZoom={minZoom}
          attribution={attribution}
          opacity={opacity}
          className="tile-layer"
        />
        <MapEvents />
        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom
          showCoverageOnHover
          zoomToBoundsOnClick
          iconCreateFunction={createClusterIcon}
          className="marker-cluster-group"
        >
          {places.map((place) => (
            <Marker
              key={`marker_${place.id}`}
              position={[place.latitude, place.longitude]}

            >
              <Popup>
                <h1>{place.name}</h1>
                <pre>{JSON.stringify(place.info, null, 2)}</pre>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
