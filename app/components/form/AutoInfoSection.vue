<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">자동 정보</div>
    <v-row>
      <v-col cols="12" sm="6">
        <DateInfo @update:date="onDateUpdate" />
      </v-col>
      <v-col cols="12" sm="6">
        <LocationInfo @update:location="onLocationUpdate" />
      </v-col>
      <v-col cols="12" sm="6">
        <WeatherInfo
          :weather-data="weatherData"
          :loading="loading"
          :error="error"
          @update:weather="onWeatherUpdate"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <TemperatureInfo
          :weather-data="weatherData"
          :loading="loading"
          :error="error"
          @update:temperature="onTemperatureUpdate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import DateInfo from "./info/DateInfo.vue";
import LocationInfo from "./info/LocationInfo.vue";
import TemperatureInfo from "./info/TemperatureInfo.vue";
import WeatherInfo from "./info/WeatherInfo.vue";

// 공통 composable 사용 (모든 자식 컴포넌트가 공유)
const { weatherData, loading, error } = await useWeather();

// 이벤트를 상위 컴포넌트로 전달하기 위한 emits 정의
const emit = defineEmits([
  "update:date",
  "update:location",
  "update:weather",
  "update:temperature",
]);

// 각 자식 컴포넌트의 이벤트를 받아 상위로 전달하는 핸들러
const onDateUpdate = (date: string) => {
  emit("update:date", date);
};

const onLocationUpdate = (location: string) => {
  emit("update:location", location);
};

const onWeatherUpdate = (weather: string) => {
  emit("update:weather", weather);
};

const onTemperatureUpdate = (temperature: string) => {
  emit("update:temperature", temperature);
};
</script>
