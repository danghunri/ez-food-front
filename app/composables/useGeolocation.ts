import { getAddressFromCoords } from "~/services/api";
import { getCurrentPosition } from "~/utils/geolocation";

export const useGeolocation = () => {
  const loading = ref(true);
  const location = ref("");
  const error = ref<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const response = await getAddressFromCoords(position.lon, position.lat);
      location.value = response.address;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getCurrentLocation();
  });

  return {
    loading,
    location,
    error,
  };
};
