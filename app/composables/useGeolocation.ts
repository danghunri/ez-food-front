import { getAddressFromCoords } from "~/services/api";

export const useGeolocation = () => {
  const loading = ref(true);
  const location = ref("");
  const error = ref<string | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      error.value = "위치 정보가 지원되지 않습니다";
      loading.value = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await getAddressFromCoords(
            position.coords.longitude,
            position.coords.latitude
          );
          location.value = response.address;
        } catch (err) {
          error.value = (err as Error).message;
        } finally {
          loading.value = false;
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err) => {
        error.value = "위치 정보를 가져올 수 없습니다";
        loading.value = false;
      }
    );
  };

  return {
    loading,
    location,
    error,
    getCurrentLocation,
  };
};
