<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center">
        <v-icon icon="mdi-weather-partly-cloudy" class="mr-2" />
        <div>
          <div class="text-caption">날씨</div>
          <div v-if="loading">
            <v-progress-linear indeterminate />
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
const loading = ref(true);
const weather = ref("");

// 날씨 API 호출
onMounted(async () => {
  // 여기서 날씨 API 호출
  // 임시 데이터
  setTimeout(() => {
    weather.value = "맑음";
    loading.value = false;
  }, 1000);
});
</script>
