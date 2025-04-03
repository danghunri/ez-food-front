<script setup lang="ts">
import { b64DecodeUnicode } from "~/utils/encoding";

const route = useRoute();
const recommendationReason = ref("");
const recommendedFoods = ref<string[]>([]);

onMounted(() => {
  const encodedData = route.query.data as string;
  if (encodedData) {
    try {
      const decodedData = JSON.parse(b64DecodeUnicode(encodedData));
      recommendationReason.value = decodedData.reason;
      recommendedFoods.value = decodedData.foods;
    } catch (e) {
      console.error("결과 데이터 파싱 실패:", e);
    }
  }
});
</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="my-5">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4" elevation="2">
          <h2 class="text-h5 mb-4 text-center">추천 결과</h2>
          <div v-if="recommendationReason" class="mb-4">
            <strong>추천 이유:</strong>
            <p>{{ recommendationReason }}</p>
          </div>

          <div v-if="recommendedFoods.length > 0">
            <strong>추천 음식 리스트(랭킹 순):</strong>
            <ol class="mt-2">
              <li v-for="(food, index) in recommendedFoods" :key="index">
                {{ food }}
              </li>
            </ol>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
