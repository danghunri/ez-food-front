<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">자동 정보</div>
    <v-row>
      <v-col cols="12" sm="6">
        <DateInfo />
      </v-col>
      <v-col cols="12" sm="6">
        <LocationInfo />
      </v-col>
      <v-col cols="12" sm="6">
        <WeatherInfo
          :weather-data="weatherData"
          :loading="loading"
          :error="error"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <TemperatureInfo
          :weather-data="weatherData"
          :loading="loading"
          :error="error"
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
</script>
