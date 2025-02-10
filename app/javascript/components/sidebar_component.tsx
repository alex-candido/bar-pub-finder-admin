import React from "react";

import InputSearch from "./input_search_component";
import PlacesList from "./places_list_component";
import LocationCard from "./location_card_component";

const Sidebar = () => {
  return (
    <div className="map-sidebar">
      <InputSearch />
      <div className="sidebar-content">
        <LocationCard />
        <PlacesList />
      </div>
    </div>
  );
};

export default Sidebar;
