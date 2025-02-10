import React, { useState, useEffect } from "react";

import { MapBoxProvider } from "leaflet-geosearch";

const access_token =
  "pk.eyJ1IjoiYWxleGNuZGQiLCJhIjoiY203MHM1Nmp5MDU4YTJscHY1eDVocjVieCJ9.3IG6pRUQtgGg23gFSSDSiQ";
const searchUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

export function useSuggestionService() {
  const listSuggestions = (address: string) => {
    const [loading, setLoading] = React.useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const provider = new MapBoxProvider({
      searchUrl,
      params: {
        access_token,
      },
    });

    useEffect(() => {
      console.log("useSuggestionService");
      if (address.trim().length < 3) {
        setLoading(false);
        setSuggestions([]);
        return;
      }

      const controller = new AbortController();
      const getLocations = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await provider.search({ query: address });
          console.log(results);
          setSuggestions(results);
        } catch (error: any) {
          if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
            return;
          }
        } finally {
          setLoading(true);
        }
      }, 300);

      return () => {
        clearTimeout(getLocations);
        controller.abort();
      };
    }, [address]);

    return {
      suggestions,
      setSuggestions,
      loading,
    };
  };

  return {
    listSuggestions,
  };
}
