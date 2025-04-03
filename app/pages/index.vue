<template>
  <v-container>
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
</script>
