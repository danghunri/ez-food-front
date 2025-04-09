<template>
  <v-card
    ref="card"
    :class="[
      'selection-card',
      'd-flex',
      'flex-column',
      'align-center',
      'justify-center',
      { 'selection-card--selected': model === value },
    ]"
    elevation="2"
    width="100%"
    @click="model = value"
  >
    <v-card-item class="text-center">
      <v-icon :size="iconSize" class="mb-2">{{ icon }}</v-icon>
      <div class="text-subtitle-1">{{ label }}</div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { VCard } from "vuetify/components";

const model = defineModel<string>();

const props = defineProps<{
  value: string;
  label: string;
  icon: string;
  adaptiveIcon?: boolean;
}>();

const card = ref<VCard | null>(null);
const iconSize = ref(32);

onMounted(() => {
  const { mdAndUp, lgAndUp } = useDisplay();

  // 아이콘 크기만 설정하는 함수
  const updateIconSize = () => {
    if (card.value && props.adaptiveIcon) {
      const width = card.value.$el.offsetWidth;
      // 카드 너비의 약 30%를 아이콘 크기로 설정
      iconSize.value = Math.floor(width * 0.3);
    } else {
      // 기존 로직 유지
      if (lgAndUp.value) iconSize.value = 48;
      else if (mdAndUp.value) iconSize.value = 40;
      else iconSize.value = 32;
    }
  };

  // 초기 설정 및 리사이즈 이벤트에 대응
  updateIconSize();
  window.addEventListener("resize", updateIconSize);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  onUnmounted(() => {
    window.removeEventListener("resize", updateIconSize);
  });
});
</script>

<style scoped>
.selection-card {
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
  aspect-ratio: 1 / 1; /* 정사각형 비율 설정 (가로:세로 = 1:1) */
}

.selection-card:hover {
  transform: translateY(-2px);
}

.selection-card--selected {
  border: 2px solid rgb(94, 53, 177);
  background-color: rgb(94, 53, 177, 0.1);
}
</style>
