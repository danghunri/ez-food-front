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
    
    <v-spacer />
    
    <!-- Theme Toggle Button -->
    <v-btn
      variant="text"
      :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
      @click="toggleTheme"
      :title="isDark ? '라이트 모드로 전환' : '다크 모드로 전환'"
    />
  </v-app-bar>
</template>
<script lang="ts" setup>
const isHover = ref(false);

// Theme management
const { isDark, toggleTheme } = useTheme();
</script>
