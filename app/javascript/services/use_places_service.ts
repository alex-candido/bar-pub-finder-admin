import { LatLng } from "leaflet";

export function usePlacesService() {
  const listPlaces = async (northEast: LatLng, southWest: LatLng) => {
    if (
      !northEast ||
      !southWest ||
      !northEast.lat ||
      !northEast.lng ||
      !southWest.lat ||
      !southWest.lng
    ) {
      throw new Error("Invalid LatLng objects passed to listPlaces.");
    }

    const response = await fetch(
      `/api/v1/places?ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`,
    );
    const data = await response.json();

    return {
      data,
    };
  };

  const filterPlaces = async (address: string, distance: number | string) => {
    if (!address || !distance) {
      throw new Error("Address or distance is missing.");
    }

    const response = await fetch(
      `http://localhost:3100/api/v1/places/search.json?address=${address}&distance=${distance}`,
    );

    const data = await response.json();

    return {
      data,
    };
  };

  const searchLocation = async (address: string) => {
    if (!address) {
      throw new Error("Address is missing.");
    }

    const response = await fetch(
      `http://localhost:3100/api/v1/places/location.json?address=${address}`,
    );

    const data = await response.json();

    return {
      data,
    };
  };

  return {
    listPlaces,
    filterPlaces,
    searchLocation
  };
}
