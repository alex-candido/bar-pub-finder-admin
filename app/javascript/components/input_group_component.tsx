import React, { useState, ComponentProps, useEffect } from "react";

import SearchIcon from "./icons/search_icon";
import CircleXIcon from "./icons/circle_x_icon";
import PlusIcon from "./icons/plus_icon";
import CommandIcon from "./icons/command_icon";

import { useMapContext } from "../context/map_context";
import { usePlacesService } from "../services/use_places_service";

interface InputProps extends ComponentProps<"input"> {}

const InputGroup: React.FC<InputProps> = ({ ...props }) => {
  const [address, setAddress] = useState<string>("");
  const [distance, setDistance] = useState<number>(5);

  const { filterPlaces } = usePlacesService();
  const { filteredPlaces, saveFilteredPlaces } = useMapContext();

  const loadFilteredPlaces = async () => {
    if (address.trim() === "") return;

    const { data } = await filterPlaces(address, distance);
    saveFilteredPlaces(data);
  };

  return (
    <div className="input-group" {...props}>
      <div className="input-action">
        <div className="input-left">
          <SearchIcon />
        </div>

        <input
          type="text"
          placeholder="Search Places"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadFilteredPlaces()}
          className="input-base"
        />

        {address && (
          <div className="field-close">
            <button
              type="button"
              className="button-close"
              aria-label="Close"
              onClick={() => setAddress("")}
            >
              <span className="sr-only">Close</span>
              <CircleXIcon />
            </button>
          </div>
        )}
      </div>
      <div className="select-action">

      </div>
    </div>
  );
};

export default InputGroup;
