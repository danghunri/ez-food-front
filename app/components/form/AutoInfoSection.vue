<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">자동 정보</div>
    <v-row>
      <v-col cols="6" v-for="info in autoInfo" :key="info.label">
        <v-card variant="outlined">
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon :icon="info.icon" class="mr-2" />
              <div>
                <div class="text-caption">{{ info.label }}</div>
                <div v-if="info.loading">
                  <v-progress-linear indeterminate />
                </div>
                <div v-else class="text-body-2">
                  {{ info.value || "정보 없음" }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const autoInfo = ref([
  { label: "날짜", value: "", loading: true, icon: "mdi-calendar" },
  { label: "지역", value: "", loading: true, icon: "mdi-map-marker" },
  {
    label: "날씨",
    value: "",
    loading: true,
    icon: "mdi-weather-partly-cloudy",
  },
  { label: "기온", value: "", loading: true, icon: "mdi-thermometer" },
]);

// API 호출 및 데이터 업데이트 로직은 추후 구현
</script>
