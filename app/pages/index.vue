<template>
  <v-container fluid :max-width="containerSize">
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

const containerSize = ref<number>(800);
onMounted(() => {
  const { mdAndUp, lgAndUp } = useDisplay();

  // watchEffect를 사용하여 반응형 값 변경 감지
  watchEffect(() => {
    // 컨테이너 크기 설정
    if (lgAndUp.value) containerSize.value = 1000;
    else if (mdAndUp.value) containerSize.value = 800;
    else containerSize.value = 600;
  });
});
</script>
<style scoped></style>
