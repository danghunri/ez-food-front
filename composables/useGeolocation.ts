export const useGeolocation = () => {
  const loading = ref(true);
  const location = ref("");
  const error = ref<string | null>(null);

  const getAddressFromCoords = async (longitude: number, latitude: number) => {
    try {
      const response = await $fetch<{ address: string }>(
        "/api/geo/coord-to-address",
        {
          params: {
            x: longitude,
            y: latitude,
          },
        }
      );

      return response.address;
    } catch {
      throw new Error("주소 변환 실패");
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      error.value = "위치 정보가 지원되지 않습니다";
      loading.value = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          location.value = await getAddressFromCoords(
            position.coords.longitude,
            position.coords.latitude
          );
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
