import { LatLng } from "leaflet";

export function usePlacesService() {
  const listPlaces = async (northEast: LatLng, southWest: LatLng) => {
    const response = await fetch(
      `/api/v1/places?ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`
    );
    const data = await response.json();

    return {
      data
    }
  };

  const filterPlaces = async (address: string, distance: number) => {
    const response = await fetch(`http://localhost:3100/api/v1/places/search.json?address=${address}&distance=${distance}`);

    const data = await response.json();

    return {
      data
    }
  }

  return {
    listPlaces,
    filterPlaces
  };
}
