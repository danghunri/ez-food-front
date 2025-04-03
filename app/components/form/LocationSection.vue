<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">위치</div>
    <v-row justify="center">
      <SelectionCard
        v-for="item in locationOptions"
        :key="item.value"
        v-model="selectedLoc"
        :value="item.value"
        :label="item.label"
        :icon="item.icon"
      />
    </v-row>
  </div>
</template>

<script setup lang="ts">
import SelectionCard from "~/components/common/SelectionCard.vue";
import { LOCATION_OPTIONS } from "~/constants/locations";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const locationOptions = LOCATION_OPTIONS;
const selectedLoc = ref(props.modelValue);

watch(selectedLoc, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
