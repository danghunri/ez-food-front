import type { WeatherResponse } from "~~/types/weather";
import { getWeatherByCoords } from "~/services/api";
import { getCurrentPosition } from "~/utils/geolocation";

export const useWeather = () => {
  const weatherData = ref<WeatherResponse | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const coords = ref({ lat: 37.5665, lon: 126.978 }); // 서울 기본값
  const locationLoaded = ref(false);

  // 위치 정보 가져오기
  const getLocation = async (): Promise<void> => {
    if (!import.meta.client || locationLoaded.value) return;

    try {
      const position = await getCurrentPosition();
      coords.value = position;
    } catch (e) {
      console.error("날씨 데이터 로딩 오류:", e);
      error.value = "날씨 정보를 가져오는데 실패했습니다";
    } finally {
      locationLoaded.value = true;
      // 위치 정보 로드 후 날씨 데이터 가져오기
    }
  };

  // 날씨 데이터 가져오기
  const fetchWeatherData = async () => {
    loading.value = true;
    error.value = null;

    try {
      // API 서비스를 사용하여 날씨 데이터 요청
      weatherData.value = await getWeatherByCoords(
        coords.value.lat,
        coords.value.lon
      );
    } catch (e) {
      console.error("날씨 데이터 로딩 오류:", e);
      error.value = "날씨 정보를 가져오는데 실패했습니다";
    } finally {
      loading.value = false;
    }
  };

  // 컴포넌트 마운트 시 위치 정보 로딩
  onMounted(async () => {
    await getLocation();
    await fetchWeatherData();
  });

  return {
    weatherData,
    loading,
    error,
    coords,
  };
};
