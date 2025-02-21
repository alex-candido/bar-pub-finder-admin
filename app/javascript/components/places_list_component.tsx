import React, { ComponentProps } from "react";

import PlaceCard from "./place_card_component";
import { Place } from "../context/map_context";

interface PlacesListProps extends ComponentProps<"div"> {
  filteredPlaces: Place[];
}

const PlacesList: React.FC<PlacesListProps> = ({ filteredPlaces }) => {

  return (
    <div className="places-list shadow-2xl card mt-2">
      <div className="places-scroll">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default PlacesList;
