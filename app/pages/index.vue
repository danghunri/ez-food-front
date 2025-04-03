<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center" class="my-5">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- 선택 폼 영역 -->
          <v-card class="pa-4" elevation="2">
            <h2 class="text-h5 mb-4 text-center">메뉴 추천을 위한 정보 입력</h2>

            <!-- 컴포넌트로 분리된 섹션들 -->
            <MealTimeSection v-model="selectedMealTime" />
            <LocationSection v-model="selectedLocation" />

            <!-- 기온 -->
            <v-select
              v-model="selectedTemperature"
              :items="temperatureItems"
              label="기온 (예: 시원함, 덥다, 춥다)"
              density="comfortable"
              outlined
              class="mb-3"
            />

            <!-- 계절 -->
            <v-select
              v-model="selectedSeason"
              :items="seasonItems"
              label="계절"
              density="comfortable"
              outlined
              class="mb-3"
            />

            <!-- 목적 -->
            <v-select
              v-model="selectedPurpose"
              :items="purposeItems"
              label="식사 목적 (예: 다이어트, 든든하게 등)"
              density="comfortable"
              outlined
              class="mb-5"
            />

            <!-- 추천 버튼 -->
            <v-btn block color="primary" elevation="2" @click="recommendFoods">
              음식 추천받기
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { b64EncodeUnicode } from "~/utils/encoding";
import MealTimeSection from "~/components/form/MealTimeSection.vue";
import LocationSection from "~/components/form/LocationSection.vue";
import {
  TEMPERATURE_ITEMS,
  SEASON_ITEMS,
  PURPOSE_ITEMS,
  FOOD_BY_MEAL_TIME,
} from "~/constants/menu";

// 옵션 목록
const temperatureItems = TEMPERATURE_ITEMS;
const seasonItems = SEASON_ITEMS;
const purposeItems = PURPOSE_ITEMS;

// 선택값
const selectedMealTime = ref("");
const selectedLocation = ref("");
const selectedTemperature = ref("");
const selectedSeason = ref("");
const selectedPurpose = ref("");

// 추천 함수
const recommendFoods = async () => {
  // 선택값을 바탕으로 임의 로직 (예시)
  const mealTime = selectedMealTime.value;
  const location = selectedLocation.value;
  const temperature = selectedTemperature.value;
  const season = selectedSeason.value;
  const purpose = selectedPurpose.value;

  // 간단한 조건 분기 예시
  // 실제로는 훨씬 복잡하게 확장 가능
  let reason = `선택하신 정보(${mealTime}, ${location}, ${temperature}, ${season}, ${purpose})를 고려한 추천!`;
  let foods = [];

  // 예시 로직
  if (mealTime === "아침") {
    foods = FOOD_BY_MEAL_TIME.아침;
  } else if (mealTime === "점심") {
    foods = FOOD_BY_MEAL_TIME.점심;
  } else if (mealTime === "저녁") {
    foods = FOOD_BY_MEAL_TIME.저녁;
  } else {
    foods = FOOD_BY_MEAL_TIME.기타;
  }

  // 기온, 계절, 목적 같은 추가 정보를 바탕으로 약간의 필터/정렬(예시)
  if (temperature.includes("더운")) {
    reason += " 더운 날씨이므로 시원하게 먹을 수 있는 메뉴를 추천합니다.";
  } else if (temperature.includes("추운")) {
    reason += " 추운 날씨이므로 따뜻한 메뉴를 추천합니다.";
  }

  if (purpose === "다이어트") {
    reason +=
      " 다이어트 목적이므로 상대적으로 칼로리가 낮은 음식을 추천합니다.";
    foods = foods.filter(
      (f) => f !== "삼겹살" && f !== "피자" && f !== "스테이크"
    );
  }

  // 결과 데이터 생성
  const resultData = {
    reason: reason,
    foods: foods,
  };

  const encodedData = b64EncodeUnicode(JSON.stringify(resultData));
  await navigateTo({
    path: "/result",
    query: { data: encodedData },
  });
};
</script>
