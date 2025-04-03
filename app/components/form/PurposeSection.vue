<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">식사 목적</div>
    <div class="align-center d-flex justify-center px-5">
      <v-row justify="center">
        <SelectionCard
          v-for="item in PURPOSE_OPTIONS"
          :key="item.value"
          v-model="selectedPurpose"
          :value="item.value"
          :label="item.label"
          :icon="item.icon"
        />
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { PURPOSE_OPTIONS } from "~/constants/purposeType";
import SelectionCard from "../common/SelectionCard.vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const selectedPurpose = ref(props.modelValue);

watch(selectedPurpose, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
