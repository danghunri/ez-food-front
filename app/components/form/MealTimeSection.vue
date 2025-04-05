<template>
  <div class="mb-4 px-md-16 px-sm-8 px-4">
    <div class="text-h5 mb-4">식사 시간</div>
    <v-row>
      <v-col
        v-for="item in MEAL_TIME_OPTIONS"
        :key="item.value"
        cols="4"
        sm="3"
        md="2"
      >
        <SelectionCard
          v-model="model!"
          :value="item.value"
          :label="item.label"
          :icon="item.icon"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import SelectionCard from "~/components/common/SelectionCard.vue";
import { MEAL_TIME_OPTIONS } from "~/constants/mealTime";

const model = defineModel<string>();
</script>
