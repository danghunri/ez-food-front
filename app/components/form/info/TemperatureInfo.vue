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
          <div v-else class="text-body-2">
            {{ temperature || "정보 없음" }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const loading = ref(true);
const temperature = ref("");

// 기온 정보 가져오기
onMounted(async () => {
  // 날씨 API에서 기온 정보 호출
  // 임시 데이터
  setTimeout(() => {
    temperature.value = "24°C";
    loading.value = false;
  }, 1000);
});
</script>
>
