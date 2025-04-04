<template>
  <v-container :class="containerClass">
    <v-card class="pa-4">
      <h1 class="text-h4 mb-6 text-center">메뉴 추천</h1>

      <FoodTypeSection v-model="formData.foodType" />
      <ServiceTypeSection v-model="formData.serviceType" />
      <MealTimeSection v-model="formData.mealTime" />
      <PurposeSection v-model="formData.purpose" />
      <AutoInfoSection />

      <div class="d-flex justify-center mt-6">
        <v-btn
          color="primary"
          size="large"
          :loading="isLoading"
          @click="handleSubmit"
        >
          추천 받기
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import AutoInfoSection from "~/components/form/AutoInfoSection.vue";
import FoodTypeSection from "~/components/form/FoodTypeSection.vue";
import MealTimeSection from "~/components/form/MealTimeSection.vue";
import PurposeSection from "~/components/form/PurposeSection.vue";
import ServiceTypeSection from "~/components/form/ServiceTypeSection.vue";

const formData = ref({
  foodType: "all",
  serviceType: "all",
  mealTime: "",
  purpose: "",
});

const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // API 호출 로직 구현
    console.log("폼 데이터:", formData.value);
  } catch (error) {
    console.error("에러:", error);
  } finally {
    isLoading.value = false;
  }
};

// Vuetify의 useDisplay 훅으로 반응형 속성 가져오기
const { mdAndUp, lgAndUp } = useDisplay();

// 반응형 속성에 따라 컨테이너 클래스 설정
const containerClass = computed(() => {
  if (lgAndUp.value) return "containerLg";
  if (mdAndUp.value) return "containerMd";
  return "containerBase"; // 기본값(모바일 크기)
});
</script>
<style scoped>
.containerBase {
  max-width: 100%;
}

.containerMd {
  max-width: 800px;
}

.containerLg {
  max-width: 1000px;
}
</style>
