<template>
  <v-card
    ref="card"
    :class="[
      'selection-card',
      'd-flex',
      'flex-column',
      'align-center',
      'justify-center',
      { 'selection-card--selected': modelValue === value },
    ]"
    elevation="2"
    width="100%"
    :height="cardHeight"
    @click="$emit('update:modelValue', value)"
  >
    <v-card-item class="text-center">
      <v-icon :size="iconSize" class="mb-2">{{ icon }}</v-icon>
      <div class="text-caption">{{ label }}</div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { VCard } from "vuetify/components";

const props = defineProps<{
  modelValue: string;
  value: string;
  label: string;
  icon: string;
  adaptiveIcon?: boolean; // 새로운 prop 추가
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();

const card = ref<VCard | null>(null);
const cardHeight = ref("auto");
const iconSize = ref(32);

onMounted(() => {
  const { mdAndUp, lgAndUp } = useDisplay();

  // 카드 너비에 맞춰 높이와 아이콘 크기 설정하는 함수
  const updateCardDimensions = () => {
    if (card.value) {
      const width = card.value.$el.offsetWidth;
      cardHeight.value = `${width}px`;

      // adaptiveIcon이 true일 때 아이콘 크기를 카드 너비에 비례하게 설정
      if (props.adaptiveIcon) {
        // 카드 너비의 약 30%를 아이콘 크기로 설정 (적절한 비율로 조정 가능)
        iconSize.value = Math.floor(width * 0.3);
      } else {
        // 기존 로직 유지
        if (lgAndUp.value) iconSize.value = 48;
        else if (mdAndUp.value) iconSize.value = 40;
        else iconSize.value = 32;
      }
    }
  };

  // 초기 설정 및 리사이즈 이벤트에 대응
  updateCardDimensions();
  window.addEventListener("resize", updateCardDimensions);

  // watchEffect 대신 updateCardDimensions 사용

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  onUnmounted(() => {
    window.removeEventListener("resize", updateCardDimensions);
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
