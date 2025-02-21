import React, { useEffect, ComponentProps } from "react";
import PinIcon from "./icons/pin_icon";
import { useMapContext } from "../context/map_context";

interface LocationCardProps extends ComponentProps<"div"> {}

const LocationCard: React.FC<LocationCardProps> = () => {
    const { position, searchPosition } = useMapContext();

  return (
    <div className="location-card shadow-2xl card">
      <div className="location-image">
        <img
          src="/images/bar.jpg"
          alt=""
          className="h-full object-cover object-center rounded-md"
        />
      </div>
      <div className="location-content">
        <div className="location-name text-lg leading-none font-semibold text-gray-700">
          <span>{position.street} - {position.postal_code}</span>
        </div>
        <div className="location-city text-sm text-gray-500">
          <span>{position.city} - {position.state}, {position.country}</span>
        </div>
        <div className="location-coordinates flex text-sm text-gray-500">
          <PinIcon />
          <div className="coordinates">
          <span>
            {/* @ts-ignore */}
            {searchPosition.map((coord: number) => 
              coord.toFixed(5)).join(", ")
            }
          </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
