export const useGeolocation = () => {
  const loading = ref(true);
  const location = ref("");
  const error = ref<string | null>(null);
  const config = useRuntimeConfig();

  const getAddressFromCoords = async (longitude: number, latitude: number) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${config.public.kakaoApiKey}`,
          },
        }
      );

      const data = await response.json();
      if (data.documents[0]) {
        const addr = data.documents[0].address;
        return `${addr.region_1depth_name} ${addr.region_2depth_name} ${addr.region_3depth_name}`;
      }
      return "주소를 찾을 수 없습니다";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
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
