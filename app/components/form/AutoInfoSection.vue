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
        <WeatherInfo />
      </v-col>
      <v-col cols="12" sm="6">
        <TemperatureInfo />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import DateInfo from "./info/DateInfo.vue";
import LocationInfo from "./info/LocationInfo.vue";
import TemperatureInfo from "./info/TemperatureInfo.vue";
import WeatherInfo from "./info/WeatherInfo.vue";
</script>
