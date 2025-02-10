import React, { ComponentProps } from "react";

import { useMapContext } from "../context/map_context";
import PlaceCard from "./place_card_component";

interface PlacesListProps extends ComponentProps<"div"> {}

const PlacesList: React.FC<PlacesListProps> = () => {
  const { filteredPlaces } = useMapContext();

  return (
    <div className="places-list mt-2">
      { filteredPlaces.length > 0 && (
        <div className="places-scroll">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      )}
    </div>
  );
};

export default PlacesList;
