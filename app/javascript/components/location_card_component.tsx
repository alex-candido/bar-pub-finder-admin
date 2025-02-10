import React from "react";
import PinIcon from "./icons/pin_icon";
import { useMapContext } from "../context/map_context";

const LocationCard = () => {
    const { searchPosition } = useMapContext();
  return (
    <div className="location-card card">
      <div className="location-image">
        <img
          src="/images/bar.jpg"
          alt=""
          className="h-full object-cover object-center rounded-md"
        />
      </div>
      <div className="location-content">
        <div className="location-name text-xl font-semibold text-gray-700">
          <span>Fortaleza</span>
        </div>
        <div className="location-coordinates flex text-sm text-gray-500">
          <PinIcon />
          <div className="coordinates">
            <span>{Array(searchPosition).join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
