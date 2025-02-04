import React, { ComponentProps, useState, useEffect, Component} from "react";

import { LatLngBounds, LatLngBoundsExpression, LatLngExpression, LeafletEvent } from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import { useLocationService } from "../services/use_location_service"
import { usePlacesService } from "../services/use_places_service"

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
  const [position, setPosition] = useState<LatLngExpression>(default_position);
  const [places, setPlaces] = useState<Place[]>([]);

  const { getNavigatorLocation } = useLocationService();
  const { getPlaces } = usePlacesService()

  const loadPlacesWithinBounds = async (bounds: LatLngBounds) => {
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    try {
      const { data } = await getPlaces(northEast, southWest)

      clearPlaces();
      setPlaces(data);
    } catch (error) {
      console.error("Erro ao buscar places:", error);
    }
  }

  const handleMapMoveend = (e: LeafletEvent) => {
    loadPlacesWithinBounds(e.target.getBounds());
  }

  const handleMapZoomend= (e: LeafletEvent) => {
    loadPlacesWithinBounds(e.target.getBounds());
  }

  const clearPlaces = () => {
    setPlaces([]);
  }
  
  const MapEvents = () => {
    useMapEvents({
      moveend: (e: LeafletEvent) => handleMapMoveend(e),
      zoomend: (e: LeafletEvent) => handleMapZoomend(e)
    })
    return null;
  }

  useEffect(() => {
    getNavigatorLocation((coords: any) => {
      setPosition([coords.latitude, coords.longitude]);
    });
  }, []);

  return (
    <div className="map-view" {...props}>
      <MapContainer
        center={position}
        zoom={zoom_level}
        scrollWheelZoom={scrollWheelZoom}
        maxBounds={maxBounds}
        maxBoundsViscosity={maxBoundsViscosity}
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
      </MapContainer>
    </div>
  );
};

export default Map;
