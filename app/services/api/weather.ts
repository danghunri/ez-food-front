import type { WeatherResponse } from "~~/types/weather";

export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  try {
    return await $fetch<WeatherResponse>("/api/weather", {
      params: {
        lat,
        lon,
      },
    });
  } catch (error) {
    console.error("Weather API error:", error);
    throw createError({
      statusCode: 500,
      message: "날씨 정보를 가져오는데 실패했습니다",
    });
  }
}
