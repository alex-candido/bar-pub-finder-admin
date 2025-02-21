import React from "react";

import InputSearch from "./input_search_component";
import PlacesList from "./places_list_component";
import LocationCard from "./location_card_component";

import { useMapContext } from "../context/map_context";

const Sidebar = () => {
  const { filteredPlaces } = useMapContext();
  return (
    <div className="map-sidebar">
      <InputSearch />
      <div className="sidebar-content">
        <LocationCard />
        {filteredPlaces.length > 0 && <PlacesList filteredPlaces={filteredPlaces} />}
      </div>
    </div>
  );
};

export default Sidebar;
