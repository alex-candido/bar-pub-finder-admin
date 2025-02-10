import { LatLngExpression } from "leaflet";
import React, { ComponentProps, ReactNode, useContext, useState } from "react";

export interface Place {
  id: number;
  name: string;
  description?: string;
  type: string;
  status: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  info: any;
  is_filtered?: boolean;
}

interface MapContextType {
  places: Place[];
  updatePlaces: (places: Place[]) => Promise<void>;
  filteredPlaces: Place[];
  updateFilteredPlaces: (places: Place[]) => Promise<void>;
  searchPosition: LatLngExpression;
  updateSearchPosition: (position: LatLngExpression) => void;
  position: any;
  updatePosition: (position: any) => void;
}

interface BooksContextProviderProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export const MapContext = React.createContext({} as MapContextType);

export const MapContextProvider: React.FC<BooksContextProviderProps> = ({
  children,
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [position, setPosition] = useState<any>();
  const [searchPosition, setSearchPosition] = useState<LatLngExpression>([
    -3.71722, -38.5433,
  ]);

  const updatePlaces = async (places: Place[]) => {
    setPlaces(places);
  };

  const updateFilteredPlaces = async (places: Place[]) => {
    setFilteredPlaces(places);
  };

  const updateSearchPosition = (position: LatLngExpression) => {
    setSearchPosition(position);
  };

  const updatePosition = (position: any) => {
    setPosition(position);
  }

  return (
    <MapContext.Provider
      value={{
        places,
        updatePlaces,
        filteredPlaces,
        updateFilteredPlaces,
        searchPosition,
        updateSearchPosition,
        position,
        updatePosition
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  return useContext(MapContext);
};
