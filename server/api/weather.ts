export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  try {
    // API 키는 서버 환경 변수에서 가져옵니다
    const apiKey = config.openWeatherApiKey;
    // 클라이언트에서 전달된 위치 좌표 또는 기본값(서울) 사용
    const lat = Number(query.lat || 37.5665);
    const lon = Number(query.lon || 126.978);

    // $fetch로 API 호출
    return await $fetch(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric",
        lang: "kr",
      },
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "날씨 정보를 가져오는데 실패했습니다",
    });
  }
});
