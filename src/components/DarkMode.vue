<script lang="ts" setup>
// <!-- Global Variable Start --->
import { ref } from "vue";
const isDarkTheme = ref<boolean>(false);
// <!-- Global Variable End --->

// <!-- Switch Dark Mode Start --->
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("app-dark");
  isDarkTheme.value = document.documentElement.classList.contains("app-dark");
};
// <!-- Switch Dark Mode End --->
</script>

<template>
  <ToggleSwitch v-model="isDarkTheme" @change="toggleDarkMode">
    <template #handle="{ checked }">
      <i :class="['text-xs! pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
</template>
