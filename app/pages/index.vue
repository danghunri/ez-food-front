<template>
  <v-container fluid max-width="1000px">
    <v-card class="pa-4">
      <h1 class="text-h4 mb-6 text-center font-weight-bold">메뉴 추천</h1>

      <FoodTypeSection v-model="formData.foodType" />
      <ServiceTypeSection v-model="formData.serviceType" />
      <MealTimeSection v-model="formData.mealTime" />
      <PurposeSection v-model="formData.purpose" />
      <AutoInfoSection
        v-model:date="formData.date"
        v-model:location="formData.location"
        v-model:weather="formData.weather"
        v-model:temperature="formData.temperature"
      />

      <div class="d-flex justify-center mt-6">
        <v-btn
          color="primary"
          size="large"
          :loading="isLoading || isInferencing"
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
  foodType: "상관없음",
  serviceType: "상관없음",
  mealTime: "상관없음",
  purpose: "상관없음",
  date: null,
  location: null,
  weather: null,
  temperature: null,
});

const handleSubmit = async () => {
  const result = await getRecommendationFromData(formData.value);
  console.log(result);
};

const { initModel, isLoading, isInferencing, getRecommendationFromData } =
  useMenuRecommendation();

onMounted(async () => {
  await initModel();
});
</script>
<style scoped></style>
