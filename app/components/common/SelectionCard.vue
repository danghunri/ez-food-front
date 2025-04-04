<template>
  <v-card
    :class="[
      'selection-card',
      'ma-2',
      'd-flex',
      'flex-column',
      'align-center',
      'justify-center',
      { 'selection-card--selected': modelValue === value },
    ]"
    elevation="2"
    :width="cardSize"
    :height="cardSize"
    @click="$emit('update:modelValue', value)"
  >
    <v-card-item class="text-center">
      <v-icon :size="iconSize" class="mb-2">{{ icon }}</v-icon>
      <div class="text-caption">{{ label }}</div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";

defineProps<{
  modelValue: string;
  value: string;
  label: string;
  icon: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();

// Vuetify의 useDisplay 훅으로 반응형 속성 가져오기
const { mdAndUp, lgAndUp } = useDisplay();

// 카드 크기를 반응형으로 설정
const cardSize = computed(() => {
  if (lgAndUp.value) return 140; // 큰 화면 크기
  if (mdAndUp.value) return 120; // 중간 화면 크기
  return 100; // 기본값(모바일 크기)
});

// 아이콘 크기를 반응형으로 설정
const iconSize = computed(() => {
  if (lgAndUp.value) return 48; // 큰 화면 크기
  if (mdAndUp.value) return 40; // 중간 화면 크기
  return 32; // 기본값(모바일 크기)
});
</script>

<style scoped>
.selection-card {
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.selection-card:hover {
  transform: translateY(-2px);
}

.selection-card--selected {
  border: 2px solid rgb(94, 53, 177);
  background-color: rgb(94, 53, 177, 0.1);
}
</style>
