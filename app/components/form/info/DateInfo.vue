<template>
  <v-card variant="outlined">
    <v-card-text>
      <div class="d-flex align-center">
        <v-icon icon="mdi-calendar" class="mr-2" />
        <div>
          <div class="text-caption">날짜</div>
          <div v-if="loading">
            <v-progress-linear indeterminate />
          </div>
          <div v-else class="text-body-2">
            {{ date || "정보 없음" }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const loading = ref(true);
const date = ref("");

onMounted(async () => {
  date.value = new Date().toLocaleString("ko-KR");
  loading.value = false;
});
</script>
