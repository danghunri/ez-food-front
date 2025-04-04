<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center">
        <v-icon icon="mdi-map-marker" class="mr-2" />
        <div>
          <div class="text-caption">지역</div>
          <div v-if="loading">
            <v-progress-linear indeterminate />
          </div>
          <div v-else class="text-body-2">
            {{ error || location || "정보 없음" }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useGeolocation } from "~~/composables/useGeolocation";

const { loading, location, error, getCurrentLocation } = useGeolocation();

onMounted(() => {
  getCurrentLocation();
});
</script>
