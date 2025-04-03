<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">식사 시간</div>
    <v-row justify="center">
      <SelectionCard
        v-for="item in mealTimeOptions"
        :key="item.value"
        v-model="selectedTime"
        :value="item.value"
        :label="item.label"
        :icon="item.icon"
      />
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SelectionCard from "~/components/common/SelectionCard.vue";
import { MEAL_TIME_OPTIONS } from "~/constants/mealTime";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const mealTimeOptions = MEAL_TIME_OPTIONS;

const selectedTime = ref(props.modelValue);

watch(selectedTime, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
