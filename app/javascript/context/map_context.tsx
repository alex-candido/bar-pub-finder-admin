import React, { ComponentProps, ReactNode, useContext, useState, useEffect } from "react";

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

interface MapContextType {
    places: Place[];
    updatePlaces: (places: Place[]) => Promise<void>;
    filteredPlaces: Place[];
    updateFilteredPlaces: (places: Place[]) => Promise<void>;
    loadFilteredPlaces: () => void;
    saveFilteredPlaces: (places: Place[]) => void;
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

    const loadFilteredPlaces = () => {
        const storedPlaces = localStorage.getItem("filteredPlaces");
        if (storedPlaces) {
            setFilteredPlaces(JSON.parse(storedPlaces));
        }
    };

    const saveFilteredPlaces = (places: Place[]) => {
        localStorage.setItem("filteredPlaces", JSON.stringify(places));
    };

    const updatePlaces = async (places: Place[]) => {
        setPlaces(places);
    };

    const updateFilteredPlaces = async (places: Place[]) => {
        setFilteredPlaces(places);
    };

    useEffect(() => {
        loadFilteredPlaces();
    }, []);

    return (
        <MapContext.Provider value={{ places, updatePlaces, filteredPlaces, updateFilteredPlaces, loadFilteredPlaces, saveFilteredPlaces }}>
        {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => {
  return useContext(MapContext);
};
