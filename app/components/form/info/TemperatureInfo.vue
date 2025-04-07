<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center">
        <v-icon icon="mdi-thermometer" class="mr-2" />
        <div>
          <div class="text-caption">기온</div>
          <div v-if="loading">
            <v-progress-linear indeterminate />
          </div>
          <div v-else-if="error" class="text-body-2 text-error">
            {{ error }}
          </div>
          <div v-else class="text-body-2">
            {{ temperature }}
            <span v-if="feelsLike" class="text-caption ml-1"
              >(체감: {{ feelsLike }})</span
            >
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

// 현재 온도 (반응형)
const temperature = computed(() => {
  if (!props.weatherData?.main?.temp) return "정보 없음";
  return `${Math.round(props.weatherData.main.temp * 10) / 10}°C`;
});

// 체감 온도 (반응형)
const feelsLike = computed(() => {
  if (!props.weatherData?.main?.feels_like) return "";
  return `${Math.round(props.weatherData.main.feels_like * 10) / 10}°C`;
});
</script>
