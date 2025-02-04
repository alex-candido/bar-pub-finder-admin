
export function useLocationService() {
  const getNavigatorLocation = (callback: Function) => {
    if (!navigator.geolocation) {
      console.warn("Geolocalização não é suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      }
    );
  };

  return { getNavigatorLocation };
};
