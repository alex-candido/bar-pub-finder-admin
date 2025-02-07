import React, {
  ComponentProps,
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";

import SearchIcon from "./icons/search_icon";

import { useMapContext } from "../context/map_context";
import { usePlacesService } from "../services/use_places_service";

interface InputProps extends ComponentProps<"input"> {}

const InputSearch: React.FC<InputProps> = () => {
  const [address, setAddress] = useState<string>("");
  const [distance, setDistance] = useState<number | string>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { filterPlaces, searchLocation } = usePlacesService();
  const { updateFilteredPlaces, updateSearchPosition } = useMapContext();

  const handleSelectSuggestion = async (suggestion: any) => {
    setAddress(suggestion.label);
    updateSearchPosition([suggestion.latitude, suggestion.longitude]);
    setShowDropdown(false);
  };

  const handleSuggestion = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!address.trim()) return;

    if (address.trim().length > 2) {
      const { data } = await searchLocation(address);

      setSuggestions(data);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-search flex flex-col gap-2">
      <div className="input-group relative">
        <div className="input-action flex relative">
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
            onChange={(e) => setAddress(e.target.value)}
            className="search-input input-base"
            onKeyUp={(e) => handleSuggestion(e)}
            onKeyDown={handleKeyDown}
            required
          />
          <div className="select-action">
            <input
              type="number"
              min="1"
              placeholder="Distance"
              className="select-input input-base"
              onChange={(e) => setDistance(Number(e.target.value) || "")}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="input-right">
            <span className="px-4 inline-flex items-center min-w-fit rounded-e-md bg-white text-sm text-gray-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
              (km)
            </span>
          </div>
          {showDropdown && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
};

export default InputSearch;
