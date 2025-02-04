import { LatLng } from "leaflet";

export function usePlacesService() {
  const getPlaces = async (northEast: LatLng, southWest: LatLng) => {
    const response = await fetch(
      `/api/v1/places?ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`
    );
    const data = await response.json();

    return {
      data
    }
  };

  return {
    getPlaces,
  };
}
