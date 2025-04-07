<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center">
        <v-icon v-if="weatherIcon" :icon="weatherIcon" class="mr-2" />
        <div>
          <div class="text-caption">날씨</div>
          <div v-if="loading">
            <v-progress-linear indeterminate />
          </div>
          <div v-else-if="error" class="text-body-2 text-error">
            {{ error }}
          </div>
          <div v-else class="text-body-2">
            {{ weather || "정보 없음" }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { WeatherResponse } from "~~/types/weather";

// 부모로부터 props로 데이터 받기
const props = defineProps<{
  weatherData: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}>();

// 날씨 상태 (반응형)
const weather = computed(() => {
  if (!props.weatherData?.weather?.[0]) return "";
  return props.weatherData.weather[0].description;
});

// 날씨 아이콘 (반응형)
const weatherIcon = computed(() => {
  if (!props.weatherData?.weather?.[0]) return null;
  const iconCode = props.weatherData.weather[0].icon;
  return weatherIconMap[iconCode] || null;
});

// 날씨 아이콘 매핑
const weatherIconMap: Record<string, string> = {
  "01d": "mdi-weather-sunny",
  "01n": "mdi-weather-night",
  "02d": "mdi-weather-partly-cloudy",
  "02n": "mdi-weather-night-partly-cloudy",
  "03d": "mdi-weather-cloudy",
  "03n": "mdi-weather-cloudy",
  "04d": "mdi-weather-cloudy",
  "04n": "mdi-weather-cloudy",
  "09d": "mdi-weather-pouring",
  "09n": "mdi-weather-pouring",
  "10d": "mdi-weather-rainy",
  "10n": "mdi-weather-rainy",
  "11d": "mdi-weather-lightning",
  "11n": "mdi-weather-lightning",
  "13d": "mdi-weather-snowy",
  "13n": "mdi-weather-snowy",
  "50d": "mdi-weather-fog",
  "50n": "mdi-weather-fog",
};
</script>
