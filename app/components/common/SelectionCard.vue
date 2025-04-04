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
import { computed, ref, onMounted } from "vue";
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

const cardSize = ref(100); // 기본값으로 시작
const iconSize = ref(32); // 기본값으로 시작

onMounted(() => {
  const { mdAndUp, lgAndUp } = useDisplay();

  // watchEffect를 사용하여 반응형 값 변경 감지
  watchEffect(() => {
    // 카드 크기 설정
    if (lgAndUp.value) cardSize.value = 140;
    else if (mdAndUp.value) cardSize.value = 120;
    else cardSize.value = 100;

    // 아이콘 크기 설정
    if (lgAndUp.value) iconSize.value = 48;
    else if (mdAndUp.value) iconSize.value = 40;
    else iconSize.value = 32;
  });
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
