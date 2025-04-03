<template>
  <div class="mb-4">
    <div class="text-subtitle-1 mb-2">위치</div>
    <div class="align-center d-flex justify-center px-5">
      <v-row>
        <SelectionCard
          v-for="item in locationOptions"
          :key="item.value"
          v-model="model as string"
          :value="item.value"
          :label="item.label"
          :icon="item.icon"
        />
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectionCard from "~/components/common/SelectionCard.vue";
import { LOCATION_OPTIONS } from "~/constants/locations";

const model = defineModel<string>();
const locationOptions = LOCATION_OPTIONS;
</script>
