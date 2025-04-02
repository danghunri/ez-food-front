<script setup lang="ts">
import TheHeader from "~/components/layout/TheHeader.vue";
</script>

<template>
  <v-app>
    <TheHeader />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
