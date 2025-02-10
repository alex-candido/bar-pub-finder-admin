import React, { ComponentProps } from "react";

interface MapProps extends ComponentProps<"div"> {
    activeIndex: number;
    suggestions: any[];
    handleSelectSuggestion: (suggestion: any) => void;
}

const AutoComplete: React.FC<MapProps> = ({ activeIndex, suggestions, handleSelectSuggestion }) => {
  return (
    <div className="dropdown-search overflow-hidden">
      <div className="dropdown-content">
        <div className="p-2 space-y-0.5 dark:bg-neutral-800">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 
                hover:bg-gray-100 focus:outline-none focus:bg-gray-100 
                dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 
                ${activeIndex === index ? "bg-gray-200 dark:bg-neutral-700" : ""}`
              }
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <span>{suggestion.label}</span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
