<template>
  <div>
    <NuxtRouteAnnouncer />
    <v-app>
      <VContainer>
        <v-btn variant="elevated">asd</v-btn>
        <VBtn color="primary">asd</VBtn>
        <v-btn @click="toggleTheme">toggle theme</v-btn>
      </VContainer>
    </v-app>
  </div>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
