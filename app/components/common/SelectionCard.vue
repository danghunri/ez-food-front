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
    width="100"
    height="100"
    @click="$emit('update:modelValue', value)"
  >
    <v-card-item class="text-center">
      <v-icon size="32" class="mb-2">{{ icon }}</v-icon>
      <div class="text-caption">{{ label }}</div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  value: string;
  label: string;
  icon: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
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
