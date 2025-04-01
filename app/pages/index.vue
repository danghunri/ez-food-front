<template>
  <div>
    <!-- 심플하고 모던한 감성을 위해 앱 바는 최소한으로 -->
    <v-container fluid>
      <v-row align="center" justify="center" class="my-5">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- 선택 폼 영역 -->
          <v-card class="pa-4" elevation="2">
            <h2 class="text-h5 mb-4 text-center">메뉴 추천을 위한 정보 입력</h2>

            <!-- 식사 시간 -->
            <v-select
              v-model="selectedMealTime"
              :items="mealTimeItems"
              label="아침 / 점심 / 저녁"
              density="comfortable"
              outlined
              class="mb-3"
            />

            <!-- 위치 -->
            <v-select
              v-model="selectedLocation"
              :items="locationItems"
              label="위치 (예: 실내, 실외 등)"
              density="comfortable"
              outlined
              class="mb-3"
            />

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
            <v-btn block color="primary" @click="recommendFoods" elevation="2">
              음식 추천받기
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- 추천 결과 영역 -->
      <v-row
        align="center"
        justify="center"
        v-if="recommendationReason || recommendedFoods.length > 0"
      >
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-4" elevation="2">
            <h2 class="text-h5 mb-4 text-center">추천 결과</h2>
            <div class="mb-4" v-if="recommendationReason">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 옵션 목록
const mealTimeItems = ["아침", "점심", "저녁"];
const locationItems = ["실내", "실외", "카페", "기타"];
const temperatureItems = ["시원한 날씨", "더운 날씨", "추운 날씨"];
const seasonItems = ["봄", "여름", "가을", "겨울"];
const purposeItems = ["든든하게", "가볍게", "다이어트", "특별한 날", "기타"];

// 선택값
const selectedMealTime = ref("");
const selectedLocation = ref("");
const selectedTemperature = ref("");
const selectedSeason = ref("");
const selectedPurpose = ref("");

// 추천 결과 데이터
const recommendationReason = ref("");
const recommendedFoods = ref<string[]>([]);

// 추천 함수 (실제로는 API나 별도 로직으로 대체 가능)
const recommendFoods = () => {
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
    foods = ["토스트", "샐러드", "죽", "아메리칸 브렉퍼스트"];
  } else if (mealTime === "점심") {
    foods = ["비빔밥", "파스타", "샌드위치", "칼국수"];
  } else if (mealTime === "저녁") {
    foods = ["삼겹살", "피자", "스테이크", "초밥"];
  } else {
    foods = ["아무거나..?"];
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

  // 결과 대입
  recommendationReason.value = reason;
  recommendedFoods.value = foods;
};
</script>
