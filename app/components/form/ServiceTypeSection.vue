<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">서비스 유형</div>
    <div class="align-center d-flex justify-center px-5">
      <v-row justify="center">
        <SelectionCard
          v-for="item in SERVICE_TYPE_OPTIONS"
          :key="item.value"
          v-model="selectedType"
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
import { SERVICE_TYPE_OPTIONS } from "~/constants/serviceType";
import SelectionCard from "../common/SelectionCard.vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const selectedType = ref(props.modelValue);

watch(selectedType, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
