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
            {{ location || "정보 없음" }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const loading = ref(true);
const location = ref("");

// 위치 정보 가져오기
onMounted(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      // 여기서 위도/경도를 주소로 변환하는 API 호출
      // 임시로 좌표만 표시
      location.value = `${position.coords.latitude.toFixed(
        2
      )}, ${position.coords.longitude.toFixed(2)}`;
      loading.value = false;
    });
  }
});
</script>
