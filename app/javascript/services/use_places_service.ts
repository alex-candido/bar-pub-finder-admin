import { LatLng } from "leaflet";
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3100/api/v1"
})

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

    const { data } = await api.get(
      `/places?ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`, {
        headers: {
          'Accept': 'application/json'
        },
      }
    );

    return {
      data,
    };
  };

  const filterPlaces = async (address: string, distance: number | string) => {
    if (!address || !distance) {
      throw new Error("Address or distance is missing.");
    }

    const { data } = await api.get(
      `/places/search.json?address=${address}&distance=${distance}`, {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return {
      data,
    };
  };

  const getPlace = async (address: string) => {
    const { data } = await api.get(
      `/places/show.json?address=${address}`, {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return {
      data,
    };
  }

  return {
    listPlaces,
    filterPlaces,
    getPlace
  };
}
