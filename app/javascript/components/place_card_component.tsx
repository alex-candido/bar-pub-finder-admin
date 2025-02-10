import React, { ComponentProps } from "react";
import { Place } from "../context/map_context";

interface PlaceCardProps extends ComponentProps<"div"> {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const businessHours = { isOpen: false, opensAt: "16:00" };

  return (
    <div className="place-card flex p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <div className="place-image">
        <figure className="image">
          <img src="" alt="" />
        </figure>
      </div>

      <div className="place-content">
        <div className="place-name text-lg font-semibold text-gray-900">{place.name}</div>
        <div className="place-type mt-2">{place.type}</div>
        <div className="business-hour">
          <span
            className={`text-gray-600 dark:text-neutral-400 ${
              businessHours.isOpen ? "text-red-600" : "text-gray-600"
            }`}
          >
            {businessHours.isOpen ? "Fechado" : "Fechado"}
          </span>
          <span className="text-gray-600 dark:text-neutral-400">
            {" · "}Abre às {businessHours.opensAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
