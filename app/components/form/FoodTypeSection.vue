<template>
  <div class="mb-4 px-md-16 px-sm-8 px-4">
    <div class="text-h5 mb-4">음식 종류</div>
    <v-row>
      <v-col
        v-for="item in FOOD_TYPE_OPTIONS"
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
          :adaptive-icon="true"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { FOOD_TYPE_OPTIONS } from "~/constants/foodType";
import SelectionCard from "../common/SelectionCard.vue";

const model = defineModel<string>();
</script>
