<script setup lang="ts">
// <!-- Global Variable Start --->
const githubUrl = import.meta.env.VITE_GITHUB_URL;
// <!-- Global Variable End --->
</script>

<template>
  <Toolbar class="border-0!">
    <template #start>
      <span>© 2026 Web3 Toolkit Labs, Inc</span>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <Button
          as="a"
          :href="githubUrl"
          icon="pi pi-github"
          severity="secondary"
          target="_blank"
          text
          link
        />
        <Button
          disabled="true"
          icon="pi pi-discord"
          severity="secondary"
          text
        />
        <Button
          disabled="true"
          icon="pi pi-twitter"
          severity="secondary"
          text
        />
      </div>
    </template>
  </Toolbar>
</template>
