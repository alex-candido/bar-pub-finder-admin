import React, { ComponentProps } from "react";

interface PlacePopupProps extends ComponentProps<"div"> {
  name: string;
  type: string;
  description?: string;
  image_url?: string;
}

const PlacePopUp: React.FC<PlacePopupProps> = ({ name, type, description}) => {
  const businessHours = { isOpen: false, opensAt: "16:00" }

  return (
    <div className="card-popup">
      <div className="card-image">
        <figure className="image">
          <img
            src="/images/bar.jpg"
            alt="Save location"
            className="rounded-t-xl"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="place-name font-semibold text-lg text-gray-800 dark:text-neutral-200">{name}</div>
        <div className="place-type text-sm text-gray-600 dark:text-neutral-400">{type}</div>
        <div className="business-hour">
        <span className={`text-gray-600 dark:text-neutral-400 ${businessHours.isOpen ? 'text-red-600' : 'text-gray-600'}`}>
            {businessHours.isOpen ? 'Fechado' : 'Fechado'}
          </span>
          <span className="text-gray-600 dark:text-neutral-400">
            {' · '}Abre às {businessHours.opensAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlacePopUp;
