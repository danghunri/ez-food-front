<template>
  <v-app-bar elevation="1" height="64">
    <v-toolbar-title class="text-primary font-weight-bold">
      <NuxtLink
        to="/"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <v-icon
          icon="mdi-silverware-fork-knife"
          class="mr-2 text-primary"
          :class="{ 'text-primary-darken-1': isHover }"
        />
      </NuxtLink>
      음식 메뉴 추천
    </v-toolbar-title>
  </v-app-bar>
</template>
<script lang="ts" setup>
const isHover = ref(false);
</script>
