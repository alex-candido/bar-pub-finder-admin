import React, { ComponentProps, FormEvent, useEffect, useState } from "react";

import SearchIcon from "./icons/search_icon";
import AutoComplete from "./auto_complete_component";

import { useMapContext } from "../context/map_context";
import { usePlacesService } from "../services/use_places_service";
import { useSuggestionService } from "../services/use_suggestion_service";

interface InputProps extends ComponentProps<"input"> {}

const InputSearch: React.FC<InputProps> = () => {
  const distances = [2, 3, 4, 5, 6, 7, 8];

  const [address, setAddress] = useState<string>("");
  const [distance, setDistance] = useState<number | string>(distances[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { filterPlaces } = usePlacesService();
  const { listSuggestions } = useSuggestionService();
  const { updateFilteredPlaces, updateSearchPosition } = useMapContext();
  const { suggestions, setSuggestions } = listSuggestions(address);

  const handleSelectSuggestion = async (suggestion: any) => {
    setAddress(suggestion.label);
    updateSearchPosition([suggestion.y, suggestion.x]);
    setSuggestions([]);

    setIsLoading(true);
    try {
      const { data } = await filterPlaces(
        `${suggestion.y}, ${suggestion.x}`,
        distance
      );
      updateSearchPosition([data.position.latitude, data.position.longitude]);
      updateFilteredPlaces(data.places);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsLoading(true);
    try {
      const { data } = await filterPlaces(address, distance);

      updateSearchPosition([data.position.latitude, data.position.longitude]);
      updateFilteredPlaces(data.places);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setActiveIndex(-1);
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex !== -1 && suggestions.length > 0) {
        handleSelectSuggestion(suggestions[activeIndex]);
      } else {
        event.currentTarget.form?.requestSubmit();
      }
    }
    if (event.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }
    if (event.key === "ArrowUp") {
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-search flex flex-col gap-2">
      <div className="input-group flex-col relative">
        <div className="input-action flex relative w-full">
          <div className="input-left">
            {isLoading ? (
              <div
                className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <SearchIcon />
            )}
          </div>
          <input
            type="text"
            placeholder="Search Places"
            value={address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="search-input input-base"
            required
          />
        </div>
        <div className="buttons-action w-full">
            {distances.map((d) => (
              <button
                key={d}
                type="submit"
                onClick={() => setDistance(d)}
                onKeyDown={handleKeyDown}
                className={`btn-outline transition ${
                  distance === d ? "active-outline" : ""
                }`}
              >
                {d}km
              </button>
            ))}
        </div>
        {suggestions.length > 0 && (
          <AutoComplete
            activeIndex={activeIndex}
            suggestions={suggestions}
            handleSelectSuggestion={handleSelectSuggestion}
          />
        )}
      </div>
    </form>
  );
};

export default InputSearch;
