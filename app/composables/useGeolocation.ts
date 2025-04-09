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
      console.error("위치 데이터 로딩 오류:", err);
      error.value = "위치 정보를 가져오는데 실패했습니다";
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await getCurrentLocation();
  });

  return {
    loading,
    location,
    error,
  };
};
